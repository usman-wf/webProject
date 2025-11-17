import { useEffect } from "react";

import UserItem from "../Detail/UserItem";
import useStory from "../hooks/Story/useStory";

const StorySettings = (props) => {
  useEffect(() => {
    getStoryInformation(props.id);
  }, []);

  const {
    getStoryInformation,
    prepareHiddenUsers,
    updateHiddenUsers,
    followersHideStatus,
  } = useStory();

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col pb-5 border-b border-[#dddddd] gap-y-3">
        <h3 className="font-bold text-lg">Story hidden from</h3>
        {followersHideStatus.map((item) => {
          if (item.is_hidden) {
            return (
              <UserItem
                key={item.username}
                username={item.username}
                profilePicture={item.profile_picture}
                mode={"story-edit"}
                isSelected={true}
                onClick={prepareHiddenUsers}
              />
            );
          }
        })}
      </div>
      <div className="flex flex-col pt-5 gap-y-3">
        <h3 className="font-bold text-lg">Hide story from</h3>
        {followersHideStatus.map((item) => {
          if (!item.is_hidden) {
            return (
              <UserItem
                key={item.username}
                username={item.username}
                profilePicture={item.profile_picture}
                mode={"story-edit"}
                isSelected={false}
                onClick={prepareHiddenUsers}
              />
            );
          }
        })}
      </div>
      <button
        className="sticky bottom-0 mt-3 w-full bg-green-500 py-2 rounded-md hover:bg-green-400 transition-all duration-300"
        onClick={() => {
          updateHiddenUsers(props.id);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default StorySettings;
