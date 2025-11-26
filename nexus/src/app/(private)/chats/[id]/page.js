"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import ico from "../../../../assets/add.png";
import Loader from "../../../../components/Loader/Loader";
import useSocket from "../../../../components/hooks/Socket/useSocket";

export default function Page() {
  const cookie = new Cookies();
  const username = cookie.get("username");
  const { id } = useParams();
  const router = useRouter();
  const { sendMessage, getChatMessages, chatDetail, isLoading } = useSocket();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getChatMessages(id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0); // Ensure it runs after DOM rendering
    return () => clearTimeout(timer); // Cleanup timeout
  });

  const submitHandler = (event) => {
    event.preventDefault();
    sendMessage(id, event.target.message.value, chatDetail.username);
    event.target.message.value = "";
  };

  return (
    <div className="min-h-screen max-w-[700px] mx-auto">
      {!chatDetail ? (
        <Loader />
      ) : (
        <div className="h-full w-full flex flex-col items-center">
          <div
            className="sticky top-0 shadow-md z-10 p-4 flex items-center gap-4 hover:cursor-pointer"
            onClick={() => {
              router.push(`/profile/${chatDetail.username}`);
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}${chatDetail.receiver_profile_picture}`}
              alt="profile picture"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h2 className="text-lg font-semibold">{chatDetail.username}</h2>
          </div>

          <div className="flex flex-col w-full h-[80%] mb-12 overflow-y-auto p-4">
            {chatDetail.messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end ${
                  message.is_owner ? "justify-end" : "justify-start"
                } mb-4`}
              >
                {!message.is_owner && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL}${chatDetail.receiver_profile_picture}`}
                    alt="Sender profile"
                    width={20}
                    height={20}
                    className="rounded-full mr-2"
                    onClick={() => {
                      router.push(`/profile/${chatDetail.username}`);
                    }}
                  />
                )}
                <div
                  className={`max-w-sm p-3 rounded-lg relative ${
                    message.is_owner
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {message.content}
                </div>
                {message.is_owner && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL}${chatDetail.sender_profile_picture}`}
                    alt="Receiver profile"
                    width={20}
                    height={20}
                    className="rounded-full ml-2"
                    onClick={() => {
                      router.push(`/profile/${username}`);
                    }}
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <form
            className="fixed bottom-[60px] lg:bottom-[10px] w-[90%] flex flex-col items-center"
            onSubmit={submitHandler}
          >
            <div className="w-full flex flex-col gap-x-4">
              <div className="w-full flex justify-center gap-x-4">
                <div className="w-[50%] rounded-xl">
                  <textarea
                    className="border border-gray-400 w-full h-full resize-none p-3 rounded-xl focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Enter prompt"
                    rows={1}
                    name="message"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        if (event.shiftKey) {
                          event.preventDefault();
                          const { selectionStart, selectionEnd, value } =
                            event.currentTarget;
                          event.currentTarget.value =
                            value.substring(0, selectionStart) +
                            "\n" +
                            value.substring(selectionEnd);
                          event.currentTarget.selectionStart =
                            event.currentTarget.selectionEnd =
                              selectionStart + 1;
                        } else {
                          event.preventDefault();
                          document.getElementById("myButton")?.click();
                        }
                      }
                    }}
                  ></textarea>
                </div>

                <button type="submit" id="myButton">
                  <Image src={ico} alt="enter" className="h-12 w-12" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
