import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import PrimaryButton from "../Button/PrimaryButton";

const UserItem = (props) => {
  const router = useRouter();

  const [isSelected, setIsSelected] = useState(props.isSelected);

  const toggleState = (event) => {
    event.stopPropagation();
    setIsSelected((state) => !state);
    props.onClick(props.username);
  };

  return (
    <div
      className="w-full transition-all duration-300 rounded-lg p-3 flex items-center hover:cursor-pointer hover:bg-gray-700 justify-between gap-x-3"
      onClick={() => {
        router.push(`/profile/${props.username}`);
      }}
    >
      <div className="flex items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_URL}${props.profilePicture}`}
          width={20}
          height={20}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="ml-5">{props.username}</span>
      </div>
      {props.mode === "story-edit" ? (
        <span
          className={`w-10 h-10 rounded-full ${
            isSelected ? "bg-green-500" : "bg-white"
          }`}
          onClick={toggleState}
        ></span>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserItem;
