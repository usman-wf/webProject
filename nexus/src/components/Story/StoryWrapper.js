"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import StoryDetail from "../Detail/StoryDetail";
import useStory from "../hooks/Story/useStory";
import ConfirmationModal from "../Layout/ConfirmationModal";

const StoryWrapper = (props) => {
  const params = useSearchParams();
  //   const { username } = useParams();
  const nextIndex = Number(params.get("ind"));
  let username = params.get("username");
  console.log("USER", username);
  const router = useRouter();

  const {
    updateViewersList,
    modalHandler,
    getStoriesOfUser,
    deleteStory,
    currentStory,
    isLoading,
    isModalOpen,
  } = useStory();

  const [currentViewIndex, setcurrentViewIndex] = useState(nextIndex);

  const storyHandler = (value) => {
    if (value < 0) {
      for (let i = 0; i < props.allStories.length; i++) {
        const story = props.allStories[i];
        console.log("STORY", story);

        if (username === story.username) {
          if (i - 1 >= 0) {
            const prevStory = props.allStories[i - 1];
            console.log("SET", prevStory);
            setcurrentViewIndex(Number(prevStory.story_index_to_view));
            // username = prevStory.username;

            const newUrl = `?username=${prevStory.username}&ind=${prevStory.story_index_to_view}`;
            window.history.pushState(null, "", newUrl);

            return;
          } else {
            props.viewHandler(false);
            router.push("/");
          }
        }
      }
    } else if (value > currentStory.total_stories - 1) {
      for (let i = 0; i < props.allStories.length; i++) {
        const story = props.allStories[i];
        console.log("STORY", story);

        if (username === story.username) {
          if (i + 1 < props.allStories.length) {
            const nextStory = props.allStories[i + 1];
            console.log("SET", nextStory);
            // username = nextStory.username;

            const newUrl = `?username=${nextStory.username}&ind=${nextStory.story_index_to_view}`;
            window.history.pushState(null, "", newUrl);
            setcurrentViewIndex(Number(nextStory.story_index_to_view));

            return;
          } else {
            props.viewHandler(false);
            router.push("/");
          }
        }
      }
    }
    setcurrentViewIndex(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("CUR", currentViewIndex, username);
      const stories = await getStoriesOfUser(username, currentViewIndex);
      // console.log("STORIE", stories);
      // if (currentViewIndex >= stories) {
      //   console.log("RUN");
      //   setcurrentViewIndex(0);
      // }
    };
    fetchData();
  }, [currentViewIndex, username]);

  return (
    <div className="fixed left-0 top-0 h-full w-full z-[3000] text-center">
      {currentStory && (
        <div className="absolute w-full h-full bg-black bg-opacity-[0.5]">
          <div className="fixed top-[8%] h-fit w-full flex flex-col items-center gap-y-5">
            {/* {currentStory.is_owner && (
              <div className="text-center">
                Viewed By: {currentStory.viewed_by_count}
              </div>
            )} */}
            <div className="flex w-[80%] lg:max-w-[500px] gap-x-3">
              {/* {currentStory.photos.map((item, index) => {
                let viewedBg;
                if (index < currentViewIndex) {
                  viewedBg = "bg-white";
                }
                if (index > currentViewIndex) {
                  viewedBg = "bg-gray-700";
                }
                return (
                  <div
                    key={index}
                    className={`relative flex-1 ${viewedBg} h-[0.5px] rounded-full`}
                  >
                    {index === currentViewIndex && (
                      <div className="bg-white h-full fill-width"></div>
                    )}
                  </div>
                );
              })} */}

              {Array.from({ length: currentStory.total_stories }).map(
                (_, index) => {
                  let viewedBg;
                  if (index < currentViewIndex) {
                    viewedBg = "bg-white";
                  } else if (index > currentViewIndex) {
                    viewedBg = "bg-gray-700";
                  }
                  // console.log("CUR", currentViewIndex, index);

                  return (
                    <div
                      key={index}
                      className={`relative flex-1 ${viewedBg} h-[0.5px] rounded-full`}
                    >
                      {index === currentViewIndex && (
                        <div className="bg-white h-full w-full absolute top-0 left-0"></div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex w-fit h-fit items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_URL}${currentStory.profile_image}`}
                alt="profile"
                width={10}
                height={10}
                objectFit="contain"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-5 font-semibold h-fit">
                {currentStory.username}
              </span>
            </div>
          </div>

          <StoryDetail
            id={currentStory.id}
            image={currentStory.image}
            username={currentStory.username}
            caption={currentStory.caption}
            storiesLength={currentStory.total_stories}
            storyHandler={storyHandler}
            currentIndex={currentViewIndex}
            updateViewersList={updateViewersList}
            isLoading={isLoading}
            viewHandler={props.viewHandler}
            onDeleteClick={() => {
              modalHandler(true);
            }}
            isOwner={currentStory.is_owner}
            viewedBy={currentStory.viewed_by_count}
          />
        </div>
      )}
      {isModalOpen && (
        <ConfirmationModal
          onCancel={() => {
            modalHandler(false);
          }}
          onContinue={() => {
            deleteStory(currentStory.id);
            setcurrentViewIndex((state) => state + 1);
            modalHandler(false);
          }}
        />
      )}
    </div>
  );
};

export default StoryWrapper;
