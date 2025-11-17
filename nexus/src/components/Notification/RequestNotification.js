import Image from "next/image";
import { useRouter } from "next/navigation";

import PrimaryButton from "../Button/PrimaryButton";

const RequestNotification = (props) => {
  const router = useRouter();

  const clickNotificationHandler = () => {
    console.log("PIR", props.type);
    router.push(`/profile/${props.from}`);
  };
  return (
    <div className="w-full transition-all duration-300 rounded-lg p-3 flex items-center hover:cursor-pointer justify-between gap-x-3">
      <div className="flex items-center" onClick={clickNotificationHandler}>
        <Image
          src={`${process.env.NEXT_PUBLIC_URL}${props.profilePicture}`}
          alt="profile"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col w-fit">
          <span className="ml-5">@{props.text}</span>
          <span className="ml-5 text-xs font-semibold text-gray-400">
            {props.time}
          </span>
        </div>
      </div>
      <div className="flex gap-x-1 lg:gap-x-4 items-center">
        <PrimaryButton
          onClick={() => {
            props.acceptHandler(props.from);
          }}
        >
          Confirm
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {
            props.cancelHandler(props.from);
          }}
        >
          Cancel
        </PrimaryButton>
      </div>
    </div>
  );
};

export default RequestNotification;
