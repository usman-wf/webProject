import Image from "next/image";
import Link from "next/link";

const StoryItem = (props) => {
  console.log("PRI", props.profilePicture);
  return (
    <div className={`w-20 h-fit rounded-full hover:cursor-pointer `}>
      <div
        // href={`/Story/${props.username}?ind=${props.indexToView}`}
        onClick={() => {
          const newUrl = `?username=${props.username}&ind=${props.indexToView}`;
          window.history.pushState(null, "", newUrl);
          props.viewHandler(true);
        }}
        className="w-20 h-full flex flex-col items-center"
      >
        <Image
          className={`w-20 h-20 rounded-full object-cover p-1 ${
            props.hasNew ? "border-2 border-green-500" : ""
          }`}
          width={10}
          height={10}
          src={`${process.env.NEXT_PUBLIC_URL}${props.profilePicture}`}
          alt="profile"
        />
        <span className="max-w-full text-center text-sm break-words line-clamp-1 mt-1">
          {props.username}
        </span>
      </div>
    </div>
  );
};

export default StoryItem;
