"use client";

import Image from "next/image";

import Logo from "../../../assets/logo.svg";
import SearchLogo from "../../../assets/search.svg";
import ListViewUser from "../../../components/List/ListViewUser";
import TextInput from "../../../components/Input/TextInput";

const SearchedUsers = [
  { profilePicture: Logo, username: "username_1" },
  { profilePicture: Logo, username: "username_2" },
  { profilePicture: Logo, username: "username_3" },
  { profilePicture: Logo, username: "username_4" },
  { profilePicture: Logo, username: "username_5" },
  { profilePicture: Logo, username: "username_6" },
];

const Page = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[80%] flex flex-col gap-y-1">
        <div className="w-full flex flex-col mb-5">
          <span
            className={` hover:cursor-pointer text-3xl p-4 rounded-lg font-thin underline-expand w-fit mt-10`}
          >
            Search
          </span>
        </div>
        <ListViewUser mode="search" />
      </div>
    </div>
  );
};

export default Page;
