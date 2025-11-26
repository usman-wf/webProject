"use client";

import { useState, useEffect } from "react";

import Logo from "../../../assets/logo.svg";
import RequestNotification from "../../../components/Notification/RequestNotification";
import OtherNotification from "../../../components/Notification/OtherNotification";
import useUser from "../../../components/hooks/User/useUser";
import Loader from "../../../components/Loader/Loader";

const SwitchButtons = [
  { text: "requests", isActive: false },
  { text: "likes", isActive: false },
  { text: "comments", isActive: false },
];

const RequestNotifications = [
  { profilePicture: Logo, username: "zayn_malik" },
  { profilePicture: Logo, username: "justin_bieber" },
  { profilePicture: Logo, username: "gigi_hadid" },
  { profilePicture: Logo, username: "kim_kardashian" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
];

const Page = () => {
  const {
    getAllNotifications,
    acceptRequestHandler,
    cancelRequestHandler,
    allNotifications,
    isLoading,
  } = useUser();

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <div className="w-full h-full flex justify-center ">
      <div className="w-fit flex flex-col gap-y-4">
        <span
          className={` hover:cursor-pointer text-3xl p-4 rounded-lg font-thin underline-expand w-fit mt-10`}
        >
          Notifications
        </span>
        {isLoading ? (
          <Loader />
        ) : (
          allNotifications.map((item) => {
            if (item.notify_type == "follow_request") {
              return (
                <RequestNotification
                  key={item.username}
                  profilePicture={item.profile_picture}
                  text={item.notify_text}
                  from={item.notify_from}
                  time={item.notify_date}
                  acceptHandler={acceptRequestHandler}
                  cancelHandler={cancelRequestHandler}
                />
              );
            } else {
              return (
                <OtherNotification
                  key={item.username}
                  profilePicture={item.profile_picture}
                  text={item.notify_text}
                  type={item.notify_type}
                  from={item.notify_from}
                  post={item.post_image}
                  id={item.post_id}
                  time={item.notify_date}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Page;
