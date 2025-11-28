"use client";

import { useEffect } from "react";
import Image from "next/image";
import { toImageSrc } from "../../../utils/image";
import { useRouter } from "next/navigation";

import useMessage from "../../../components/hooks/Message/useMessage";
import Loader from "../../../components/Loader/Loader";

export default function Page() {
  const { getChatPreviews, chatPreviews, isLoading } = useMessage();

  const router = useRouter();

  useEffect(() => {
    getChatPreviews();
  }, []);
  return (
    <div className="p-5">
      <div className="flex flex-col">
        <span
          className={` hover:cursor-pointer text-3xl p-4 rounded-lg font-thin underline-expand w-fit mt-10`}
        >
          Chats
        </span>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="p-4 flex flex-col">
            {chatPreviews.map((chat) => {
              return (
                <div
                  className="flex items-center gap-x-5 w-full p-4 border-b border-[#dddddd] hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 "
                  onClick={() => {
                    router.push(`/chats/${chat.id}`);
                  }}
                  key={chat.username}
                >
                  <Image
                    height={10}
                    width={10}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="profile"
                    src={toImageSrc(chat.profile_picture)}
                  />
                  <span className="font-bold">{chat.username}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
