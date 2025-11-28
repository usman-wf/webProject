import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { toImageSrc } from "../../utils/image";
import { useRouter } from "next/navigation";

import LikeLogo from "../../assets/notification.png";
import ActiveLikeLogo from "../../assets/activeNotification.png";
import DeleteLogo from "../../assets/delete.png";
import CommentLogo from "../../assets/comment.svg";
import Slideup from "../Layout/Slideup";
import usePost from "../hooks/Post/usePost";
import ConfirmationModal from "../Layout/ConfirmationModal";

const Comments = [
  {
    username: "zayn_malik",
    profilePicture: CommentLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
  {
    username: "zayn_malik",
    profilePicture: CommentLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
  {
    username: "zayn_malik",
    profilePicture: CommentLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
  {
    username: "zayn_malik",
    profilePicture: CommentLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
  {
    username: "zayn_malik",
    profilePicture: CommentLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
];

const PostDetail = (props) => {
  const [isSlideupOpen, setIsSlideupOpen] = useState(false);
  const [heading, setHeading] = useState();
  const [mode, setMode] = useState();
  const [currentLikes, setCurrentLikes] = useState(props.likes);
  const [hasLiked, setHasLiked] = useState(props.hasLiked);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [caption, setCaption] = useState(props.caption);
  const { toggleLike, editPost, deletePost, modalHandler, isModalOpen } =
    usePost();

  const router = useRouter();

  const slideupHandler = (value) => {
    setIsSlideupOpen(value);
  };

  const likeHandler = () => {
    if (!hasLiked) {
      setCurrentLikes((state) => state + 1);
    } else {
      setCurrentLikes((state) => state - 1);
    }
    setHasLiked((state) => !state);
    toggleLike(props.id);
  };

  const editHandler = () => {
    setIsEditingCaption(true);
    const input = document.getElementById(`post${props.id}`);

    input.disabled = false;
    input.focus();

    input.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex flex-col w-full max-w-[500px] gap-y-2 border-b border-gray-800 py-10">
      <div className="flex justify-between items-center">
        <Link href={`/profile/${props.username}`} className="flex items-center">
          <Image
            src={props.profilePicture && toImageSrc(props.profilePicture)}
            className="w-10 h-10 rounded-full"
            alt="profile"
            width={10}
            height={10}
          />
          <span className="ml-3">{props.username}</span>
        </Link>
        {props.isOwner && (
          <div className="flex gap-x-4">
            <div
              className="hover:cursor-pointer font-bold text-lg mt-[-3px] h-fit"
              onClick={editHandler}
            >
              ...
            </div>
            <Image
              width={25}
              height={25}
              src={DeleteLogo}
              onClick={() => {
                modalHandler(true);
              }}
              className="cursor-pointer"
              alt="delete"
            />
            {/* <div
              className="hover:cursor-pointer  text-lg"
              onClick={() => {
                modalHandler(true);
              }}
            >
              delete
            </div> */}
          </div>
        )}
      </div>
      <Image
        src={toImageSrc(props.post)}
        className="rounded-md mb-3"
        width={500} // Set your desired width
        height={300} // Set your desired height
        objectFit="contain"
        alt="post"
      />
      <div className="flex flex-col">
        <div className="flex gap-x-2">
          <Image
            width={25}
            height={25}
            src={hasLiked ? ActiveLikeLogo : LikeLogo}
            className={`cursor-pointer`}
            alt="like"
            onClick={likeHandler}
          />
          <Image
            width={25}
            height={25}
            src={CommentLogo}
            onClick={() => {
              setHeading("Comments");
              setMode("comment");
              slideupHandler(true);
            }}
            className="cursor-pointer"
            alt="comment"
          />
        </div>
        <span
          className="text-xs mt-1 font-normal hover:cursor-pointer"
          onClick={() => {
            setHeading("Likes");
            setMode("likes");
            slideupHandler(true);
          }}
        >
          {currentLikes} likes
        </span>
      </div>
      <span className="text-sm flex justify-between gap-x-2">
        <div className="w-full flex gap-x-2">
          <span
            className="font-semibold hover:cursor-pointer items-start"
            onClick={() => {
              router.push(`/profile/${props.username}`);
            }}
          >
            {props.username}
          </span>
          {isEditingCaption ? (
            <textarea
              defaultValue={caption}
              disabled={!isEditingCaption}
              // onBlur={() => {
              //   setIsEditingCaption(false);
              // }}
              className="ml-2 bg-transparent focus:outline-none w-full"
              onChange={(event) => {
                setCaption(event.target.value);
              }}
            />
          ) : (
            <p id={`post${props.id}`}>{caption}</p>
          )}
        </div>
        {isEditingCaption && (
          <button
            className="bg-black rounded-md w-fit p-2"
            onClick={() => {
              setIsEditingCaption(false);
              editPost(props.id, caption);
            }}
          >
            Save
          </button>
        )}
      </span>
      <span className="text-xs text-gray-400 font-semibold">
        {props.time} ago
      </span>
      {isSlideupOpen && (
        <Slideup
          id={props.id}
          slideupHandler={slideupHandler}
          commentsList={Comments}
          heading={heading}
          mode={mode}
        />
      )}
      {isModalOpen && (
        <ConfirmationModal
          onCancel={() => {
            modalHandler(false);
          }}
          onContinue={() => {
            deletePost(props.id);
            modalHandler(false);
          }}
        />
      )}
    </div>
  );
};

export default PostDetail;
