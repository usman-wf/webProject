"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";

import Logo from "../../assets/mountain.JPG";
import StoryItem from "../../components/Story/StoryItem";
import ListPosts from "../../components/List/ListPosts";
import Slideup from "../../components/Layout/Slideup";
import usePost from "../../components/hooks/Post/usePost";
import Loader from "../../components/Loader/Loader";
import useStory from "../../components/hooks/Story/useStory";
import StoryWrapper from "../../components/Story/StoryWrapper";

const StoriesToView = [
  { profilePicture: Logo, username: "zayn_malik" },
  { profilePicture: Logo, username: "justin_bieber" },
  { profilePicture: Logo, username: "gigi_hadid" },
  { profilePicture: Logo, username: "kim_kardashian" },
  { profilePicture: Logo, username: "sabrina_carpenter" },
];

const Page = () => {
  const { getAllPosts, allPosts, isLoading } = usePost();
  const { getAllStories, allStories } = useStory();
  const pathname = usePathname();
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    getAllStories();
  }, [isViewing]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const viewHandler = (value) => {
    setIsViewing(value);
  };

  return (
    <div className="flex flex-col w-full items-center lg:items-start">
      <div className="flex gap-x-4 w-full overflow-auto custom-scroll-hide p-5 border-b border-gray-800">
        {allStories.length !== 0 ? (
          allStories.map((item) => {
            return (
              <StoryItem
                key={item.username}
                profilePicture={item.profile_image}
                username={item.username}
                indexToView={item.story_index_to_view}
                hasNew={item.yet_to_view}
                viewHandler={viewHandler}
              />
            );
          })
        ) : (
          <span>No stories</span>
        )}
      </div>
      <div className="px-5 py-10 h-full w-full md:w-[70%] lg:w-[60%] ">
        {isLoading ? <Loader /> : <ListPosts posts={allPosts} />}
      </div>
      {isViewing && (
        <StoryWrapper allStories={allStories} viewHandler={viewHandler} />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Page;
