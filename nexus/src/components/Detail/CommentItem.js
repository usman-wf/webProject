import Image from "next/image";
import { toImageSrc } from "../../utils/image";
import { useRouter } from "next/navigation";

import ConfirmationModal from "../Layout/ConfirmationModal";
import DeleteLogo from "../../assets/delete.png";

const CommentItem = (props) => {
  const router = useRouter();

  const redirectHandler = () => {
    router.push(`/profile/${props.username}`);
  };

  return (
    <div className="flex items-center justify-between w-full text-sm">
      <div className="flex items-center">
        <Image
          src={toImageSrc(props.profilePicture)}
          width={10}
          height={10}
          className="w-10 h-10 rounded-full hover:cursor-pointer"
          alt="comment"
          onClick={redirectHandler}
        />
        <p className="ml-3 flex flex-col">
          <div>
            <span
              className="font-semibold mr-3 hover:cursor-pointer w-fit"
              onClick={redirectHandler}
            >
              {props.username}
            </span>
            {props.commentText}
          </div>
          <span className="font-semibold text-xs text-gray-400">
            {props.time}
          </span>
        </p>
      </div>
      {props.isOwner && (
        <Image
          src={DeleteLogo}
          height={25}
          width={25}
          className="cursor-pointer"
          onClick={() => {
            props.modalHandler(true);
          }}
          alt="delete"
        />
      )}

      {props.isModalOpen && (
        <ConfirmationModal
          onCancel={() => {
            props.modalHandler(false);
          }}
          onContinue={() => {
            props.deleteHandler(props.id);
          }}
        />
      )}
    </div>
  );
};

export default CommentItem;
