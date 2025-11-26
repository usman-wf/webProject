import { useRef, useEffect } from "react";

import CommentItem from "../Detail/CommentItem";
import usePost from "../hooks/Post/usePost";
import Loader from "../Loader/Loader";
import ConfirmationModal from "../Layout/ConfirmationModal";

const ListComments = (props) => {
  const commentRef = useRef(null);
  const {
    deleteComment,
    modalHandler,
    getAllComments,
    addComment,
    allComments,
    isLoading,
    isModalOpen,
  } = usePost();

  const submitHandler = async () => {
    await addComment(props.id, commentRef.current.value);
    commentRef.current.value = "";
    getAllComments(props.id);
  };

  const deleteCommentHandler = async (id) => {
    await deleteComment(id);
    getAllComments(props.id);
    modalHandler(false);
  };

  useEffect(() => {
    getAllComments(props.id);
  }, []);
  return (
    <div className="flex flex-col gap-y-10">
      {isLoading ? (
        <Loader />
      ) : allComments.length === 0 ? (
        <span>No comments on this post</span>
      ) : (
        allComments.map((item) => {
          return (
            <CommentItem
              id={item.comment_id}
              key={item.comment_message}
              profilePicture={item.profile_picture}
              username={item.comment_user}
              commentText={item.comment_message}
              deleteHandler={deleteCommentHandler}
              time={item.time_lapsed}
              isOwner={item.is_owner}
              modalHandler={modalHandler}
              isModalOpen={isModalOpen}
            />
          );
        })
      )}
      <div className="sticky bottom-[-10px] w-full bg-black flex items-center gap-x-10">
        <textarea
          ref={commentRef}
          className="w-[85%] border-none outline-none focus:outline:none rounded-lg bg-transparent py-5"
          placeholder="Type your comment"
          name="comment"
        />
        <button
          className="w-[15%] h-fit bg-gray-600 text-xs p-2 hover:bg-black transion-all duration-300 rounded-lg"
          onClick={submitHandler}
          disabled={isLoading}
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default ListComments;
