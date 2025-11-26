import Image from "next/image";
import { Fragment } from "react";

import TextInput from "../Input/TextInput";
import PrimaryButton from "../Button/PrimaryButton";
import ListComments from "../List/ListComments";
import ListViewUser from "../List/ListViewUser";
import Logo from "../../assets/mountain.JPG";
import StorySettings from "../Story/StorySettings";

const Users = [
  { profilePicture: Logo, isFollowing: true, username: "username_1" },
  { profilePicture: Logo, isFollowing: true, username: "username_2" },
  { profilePicture: Logo, isFollowing: false, username: "username_3" },
  { profilePicture: Logo, isFollowing: false, username: "username_4" },
  { profilePicture: Logo, isFollowing: true, username: "username_5" },
  { profilePicture: Logo, isFollowing: false, username: "username_6" },
];

const Slideup = (props) => {
  const closeSlideupHandler = () => {
    document.getElementById("test").classList.add("collapse");
    setTimeout(() => {
      props.slideupHandler(false);
    }, 500);
  };

  const editProfile = props.mode === "edit" && (
    <form
      className="h-full w-full"
      onSubmit={(event) => {
        closeSlideupHandler();
        props.saveChangesHandler(event);
      }}
    >
      <div className="p-3 rounded-lg w-full flex items-center w-full bg-[#262626] justify-between flex-col md:flex-row gap-y-10">
        <div className="flex items-center">
          <div className="flex items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}${props.userInfo.profile_picture}`}
              width={10}
              height={10}
              className="w-20 h-20 rounded-full"
              alt="profile"
            />
            <div className="flex flex-col ml-5">
              <span className="font-semibold">{props.userInfo.username}</span>
              <span className="">{props.userInfo.name}</span>
            </div>
          </div>
        </div>
        <div>
          <input
            name="profile_picture"
            type="file"
            id="file"
            accept="image/*"
            className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 hover:file:cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-y-5">
        <TextInput
          value={props.userInfo.username}
          label="Username"
          type="text"
          name="username"
          placeholder="Change username"
          errorText=""
          isRequired={false}
        />
        <TextInput
          value={props.userInfo.first_name}
          label="First Name"
          type="text"
          name="first_name"
          placeholder="Change first name"
          errorText=""
          isRequired={false}
        />
        <TextInput
          value={props.userInfo.last_name}
          label="Last Name"
          type="text"
          name="last_name"
          placeholder="Change last name"
          errorText=""
          isRequired={false}
        />
        <TextInput
          value={props.userInfo.bio}
          label="bio"
          type="text"
          name="bio"
          placeholder="Enter bio"
          isTextArea={true}
          errorText=""
          isRequired={false}
        />
        <TextInput
          label="Old Password"
          type="password"
          name="previous_password"
          placeholder="Enter old password"
          errorText=""
          isRequired={false}
        />

        <TextInput
          label="New Password"
          type="password"
          name="new_password"
          placeholder="Enter new password"
          errorText=""
          isRequired={false}
        />
        <PrimaryButton isGray={true}>Save changes</PrimaryButton>
      </div>
    </form>
  );

  console.log("MODE", props.mode);

  return (
    <div className="fixed left-0 top-0 w-full h-full z-[1000]">
      <div
        className="w-full h-full z-[1001] backdrop-blur"
        onClick={closeSlideupHandler}
      ></div>

      <div
        className={`fixed bottom-0 w-full bg-black rounded-lg expand py-10 transition-all duration-300`}
        id="test"
      >
        <div className="flex flex-col max-w-[600px] h-full mx-auto overflow-auto scrollbar-thin px-5 relative">
          <div className="flex justify-between items-center mb-10">
            <span
              className={`hover:cursor-pointer text-3xl py-4 rounded-lg font-thin underline-expand w-fit`}
            >
              {props.heading}
            </span>
            <span
              className="inline-flex items-center justify-center w-6 h-6 bg-gray-500 text-white rounded-full cursor-pointer"
              onClick={closeSlideupHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {props.mode === "edit" ? (
            editProfile
          ) : props.mode === "comment" ? (
            <ListComments id={props.id} />
          ) : props.mode === "usersList" ? (
            <ListViewUser username={props.username} mode={props.heading} />
          ) : props.mode === "story-edit" ? (
            <StorySettings id={props.id} />
          ) : props.mode === "story-viewers" ? (
            <ListViewUser id={props.id} mode="story-viewers" />
          ) : props.mode === "likes" ? (
            <ListViewUser id={props.id} mode="likes" />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Slideup;
