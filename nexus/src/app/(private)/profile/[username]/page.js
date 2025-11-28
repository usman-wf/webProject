"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toImageSrc } from "../../../../utils/image";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import ProfilePicture from "../../../../assets/mountain.JPG";
import Lock from "../../../../assets/lock.svg";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import Slideup from "../../../../components/Layout/Slideup";
import useUser from "../../../../components/hooks/User/useUser";
import Loader from "../../../../components/Loader/Loader";

const Posts = [
  { post: ProfilePicture },
  { post: ProfilePicture },
  { post: ProfilePicture },
  { post: ProfilePicture },
  { post: ProfilePicture },
  { post: ProfilePicture },
];

const userInfo = {
  username: "zayn_malik",
  name: "freak",
  bio: "Some bio",
  profilePicture: ProfilePicture,
};

const Page = () => {
  const cookie = new Cookies();
  const { username } = useParams();

  const [isSlideupOpen, setIsSlideupOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [heading, setHeading] = useState("");

  const router = useRouter();

  const {
    followStatusHandler,
    saveChangesHandler,
    unfollowUserHandler,
    getUserProfile,
    removeFollowerHandler,
    currentUser,
    isLoading,
  } = useUser();

  const slideupHandler = (value, mode, heading) => {
    setHeading(heading);
    setMode(mode);
    setIsSlideupOpen(value);
  };

  const saveChanges = async (event) => {
    await saveChangesHandler(event);
    // getUserProfile(username);
  };

  useEffect(() => {
    getUserProfile(username);
  }, []);

  console.log("PARAMS", username, currentUser);

  const cacheBustedPath = currentUser
    ? `${toImageSrc(currentUser.profile_picture)}?t=${new Date().getTime()}`
    : null;

  console.log("NOW", cacheBustedPath);
  return (
    <div className="flex flex-col gap-y-20 w-full lg:max-w-[85%] mx-auto py-20">
      {/* Header */}
      {!isLoading && currentUser ? (
        <div className="w-fit mx-auto ">
          <div className="flex gap-x-5 md:gap-x-10 lg:gap-x-20 items-center">
            <div className="flex flex-col">
              <Image
                src={toImageSrc(currentUser.profile_picture)}
                alt="profile"
                width={10}
                height={10}
                quality={100}
                objectFit="cover"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="flex gap-x-3 md:gap-x-5 lg:gap-x-10 font-semibold text-sm lg:text-lg">
                <div className="flex flex-col items-center">
                  <span>{currentUser.posts.length}</span>
                  <span>posts</span>
                </div>
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    currentUser.follows_searched_user ||
                    currentUser.user_is_himself
                      ? slideupHandler(true, "usersList", "Followers")
                      : null;
                  }}
                >
                  <span>{currentUser.followers_count}</span>
                  <span>followers</span>
                </div>
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    currentUser.follows_searched_user ||
                    currentUser.user_is_himself
                      ? slideupHandler(true, "usersList", "Following")
                      : null;
                  }}
                >
                  <span>{currentUser.following_count}</span>
                  <span>following</span>
                </div>
              </div>
              <div>
                {currentUser.user_is_himself ? (
                  <PrimaryButton
                    // classes="bg-green-500"
                    onClick={() => {
                      slideupHandler(true, "edit", "Edit Profile");
                    }}
                    disabled={isLoading}
                  >
                    Edit Profile
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    onClick={() => {
                      !currentUser.follows_searched_user
                        ? followStatusHandler(username)
                        : unfollowUserHandler(username);
                    }}
                    classes={`${
                      currentUser.follows_searched_user
                        ? "bg-gray-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {currentUser.follows_searched_user
                      ? "Following"
                      : currentUser.is_requested
                      ? "Requested"
                      : "Follow"}
                  </PrimaryButton>
                )}
                {currentUser.searched_user_follows && (
                  <PrimaryButton
                    onClick={() => {
                      removeFollowerHandler(currentUser.username);
                    }}
                  >
                    Remove follower
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <span className="font-semibold">
              {currentUser.first_name + " " + currentUser.last_name}
            </span>
            <span>{currentUser.bio}</span>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {/* POST SECTION */}

      {!isLoading &&
      currentUser &&
      (currentUser.user_is_himself || currentUser.follows_searched_user) ? (
        <div className="text-center w-full relative">
          <div className="w-full h-[1px] bg-gray-800 mb-[-1px]"></div>
          <div className="border-t border-white pt-5 w-fit absolute left-[50%] font-semibold text-sm">
            POSTS
          </div>
          <div className="flex flex-wrap gap-2 mt-20">
            {currentUser.posts.map((item, index) => {
              return (
                <Image
                  key={index}
                  onClick={() => {
                    router.push(`/post/${item.post_id}`);
                  }}
                  src={toImageSrc(item.post_image)}
                  alt="post"
                  width={500}
                  height={500}
                  className="w-[31%] aspect-square flex-grow-0 object-cover border border-white hover:cursor-pointer"
                />
              );
            })}
          </div>
        </div>
      ) : (
        currentUser &&
        currentUser.username !== cookie.get("username") &&
        !isLoading && (
          <div className="flex flex-col justify-center items-center text-center gap-y-5">
            <Image src={Lock} alt="lock" className="w-10 h-10" />
            <span>Follow this user to explore more about them</span>
          </div>
        )
      )}

      {isSlideupOpen && (
        <Slideup
          isOpen={isSlideupOpen}
          slideupHandler={slideupHandler}
          userInfo={currentUser}
          saveChangesHandler={saveChanges}
          heading={heading}
          mode={mode}
          username={username}
        />
      )}
    </div>
  );
};

export default Page;
