from django.conf import settings
from ninja import NinjaAPI, Schema
from ninja.responses import Response
from rest_framework.permissions import IsAuthenticated
from .models import Post, UserProfile
from ninja_jwt.authentication import JWTAuth
from .schema import PostSchema
from django.utils.timesince import timesince
from .posts import post_router

hp_router = NinjaAPI(urls_namespace='HPapi')

def build_absolute(request, url_path: str | None) -> str | None:
    if not url_path:
        return None
    return request.build_absolute_uri(url_path)


@hp_router.get("/posts", auth=JWTAuth())
def get_homepage_posts(request) -> Response:
    if not request.user.is_authenticated:
        return Response({"error": "Unauthorized"}, status=401)

    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return Response({"error": "User profile does not exist."}, status=404)

    following_users = user_profile.following.all()

    following_and_self = list(following_users) + [request.user]

    posts = Post.objects.filter(
        user_id__in=following_and_self).order_by('-post_date')


    response_data = []
    for post in posts:
        post_image_url = build_absolute(request, post.post_image.url) if post.post_image else None

        likes_count = post.likes_list.count()
        current_user_has_liked = False
        if (post.likes_list.filter(id=request.user.id).exists()):
            current_user_has_liked = True

        friend_profile = UserProfile.objects.get(user=post.user_id)

        profile_picture_url = build_absolute(
            request,
            friend_profile.profile_image.url if friend_profile.profile_image else f"{settings.MEDIA_URL}profile_images/default.png",
        )

        time_ago = timesince(post.post_date)

        response_data.append({
            "id": post.post_id,
            "user": post.user_id.username,
            "post_image": post_image_url,
            "created_at": post.post_date.isoformat(),
            "caption": post.caption,
            "likes_count": likes_count,
            "has_liked": current_user_has_liked,
            "profile_picture": profile_picture_url,
            "time_lapsed": time_ago,
            "is_owner": True if post.user_id == request.user else False
        })

    return Response(response_data, status=200)
