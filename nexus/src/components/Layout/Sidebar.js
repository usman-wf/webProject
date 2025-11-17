import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import Logo from "../../assets/logo.svg";
import HomeIcon from "../../assets/home.svg";
import SearchIcon from "../../assets/search.svg";
import MessageIcon from "../../assets/message.svg";
import NotificationIcon from "../../assets/notification.png";
import AddPostIcon from "../../assets/add.png";
import SupportIcon from "../../assets/support.svg";
import SidebarLink from "./SidebarLink";
import LogoutIcon from "../../assets/logout.png";
// import MessageIcon from "../../assets/comment.svg";
import useLogout from "../hooks/Auth/useLogout";

const SideLinks = [
  { link: "/", text: "Dashboard", icon: HomeIcon },
  { link: "/search", text: "Search", icon: SearchIcon },
  {
    link: "/notifications",
    text: "Notifications",
    icon: NotificationIcon,
  },
  { link: "/add-new", text: "Create", icon: AddPostIcon },
  { link: "/chats", text: "Messages", icon: MessageIcon },
  { link: "/support", text: "Support", icon: SupportIcon },
  // {
  //   link: `/profile/${cookie.get("username")}`,
  //   text: "Profile",
  //   icon: AddPostIcon,
  // },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cookie = new Cookies();

  const { logoutHandler } = useLogout();

  const profileIcon = LogoutIcon;
  // console.log("RAN", profileIcon);

  return (
    <div className="flex h-fit lg:h-screen w-full bg-gray-900 lg:bg-none lg:w-[20%] flex-col justify-between items-center border-r border-gray-800 fixed left-0 bottom-0 lg:top-0 z-50 shadow-sm">
      <div className="w-full flex lg:flex-col items-center text-center lg:py-10">
        <div className="w-full">
          <div className="px-2">
            <Image
              src={Logo}
              className="w-[50%] h-[10%] p-2 hidden lg:block"
              alt="nexus"
            />
            <ul className="space-y-1 flex justify-center lg:flex-col">
              {SideLinks.map((item) => {
                return (
                  <SidebarLink
                    key={item.link}
                    link={item.link}
                    text={item.text}
                    icon={item.icon}
                  />
                );
              })}
              <SidebarLink
                link={`/profile/${cookie.get("username")}`}
                text={"Profile"}
                icon={profileIcon}
              />
            </ul>
          </div>
        </div>
      </div>

      <div
        className="p-2 w-full hidden lg:inline-block"
        onClick={logoutHandler}
      >
        <SidebarLink link="/" text="Logout" icon={LogoutIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
