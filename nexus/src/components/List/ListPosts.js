import PostDetail from "../Detail/PostDetail";
import alternate from "../../assets/add.png";

const ListPosts = (props) => {
  return (
    <div className="w-full mx-auto flex flex-col items-center h-full">
      {props.posts.length !== 0 ? (
        props.posts.map((item) => {
          // const imageUrl = `${process.env.NEXT_PUBLIC_URL}${item.post_image}`;

          // console.log("URL", item);
          if (item.post_image) {
            return (
              <PostDetail
                id={item.id}
                key={item.id}
                username={item.user}
                profilePicture={item.profile_picture}
                post={item.post_image}
                caption={item.caption}
                likes={item.likes_count}
                hasLiked={item.has_liked}
                time={item.time_lapsed}
                isOwner={item.is_owner}
              />
            );
          }
        })
      ) : (
        <span>No posts</span>
      )}
    </div>
  );
};

export default ListPosts;
