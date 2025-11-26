import Link from "next/link";
import Image from "next/image";

const SidebarLink = (props) => {
  return (
    <li>
      <Link
        href={props.link}
        className={`p-2 relative overflow-hidden ripple w-full flex items-center hover:bg-gray-700 transition-all duration-300 rounded-lg`}
      >
        <Image
          src={props.icon}
          alt={props.text}
          width={10}
          height={10}
          className="size-8 opacity-75"
        />
        <span className="text-sm ml-3 self-center h-fit hidden lg:inline-block">
          {props.text}
        </span>
      </Link>
    </li>
  );
};

export default SidebarLink;
