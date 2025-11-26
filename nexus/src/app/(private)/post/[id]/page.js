"use client";

import { useEffect } from "react";
import PostDetail from "../../../../components/Detail/PostDetail";
import usePost from "../../../../components/hooks/Post/usePost";

export default function Page({ params }) {
  const { getSinglePost, currentPost } = usePost();

  useEffect(() => {
    getSinglePost(params.id);
  }, []); // Add getSinglePost as a dependency

  // console.log("PAR", params.id);

  return (
    <div className="p-5">
      <p
        className="text-sm underline hover:cursor-pointer"
        onClick={() => {
          window.history.back();
        }}
      >
        Back
      </p>
      {currentPost ? (
        <PostDetail
          id={currentPost.id}
          key={currentPost.id} // Assuming each post has a unique ID
          username={currentPost.user}
          profilePicture={currentPost.profile_picture} // Replace imageUrl with the actual field in currentPost
          post={currentPost.post_image} // Replace with the field that holds the image URL
          caption={currentPost.caption}
          likes={currentPost.likes_count}
          hasLiked={currentPost.has_liked}
          time={currentPost.created_at}
          isOwner={currentPost.is_owner}
        />
      ) : null}
    </div>
  );
}
