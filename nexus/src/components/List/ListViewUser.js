import { useEffect } from "react";

import UserItem from "../Detail/UserItem";
import SearchUser from "../Search/SearchUser";
import useUser from "../hooks/User/useUser";
import Loader from "../Loader/Loader";
import useStory from "../hooks/Story/useStory";
import usePost from "../hooks/Post/usePost";

const ListViewUser = (props) => {
  const {
    searchUsers,
    searchFollowedUsers,
    searchFollowers,
    allSearchedUsers,
    isLoading,
  } = useUser();

  const { getStoryiewers, isLoading: storyLoader, storyViewers } = useStory();

  const { viewLikesList, isLoading: likesLoader, likedBy } = usePost();

  useEffect(() => {
    if (props.mode === "Following") {
      searchFollowedUsers(props.username, "");
    } else if (props.mode === "Followers") {
      searchFollowers(props.username, "");
    } else if (props.mode === "story-viewers") {
      getStoryiewers(props.id, "");
    } else if (props.mode === "likes") {
      viewLikesList(props.id, "");
    }
  }, []);

  const searchHandler = (stringToSearch) => {
    if (props.mode === "Following") {
      searchFollowedUsers(props.username, stringToSearch);
    } else if (props.mode === "Followers") {
      searchFollowers(props.username, stringToSearch);
    } else if (props.mode === "story-viewers") {
      getStoryiewers(props.id, stringToSearch);
    } else if (props.mode === "likes") {
      viewLikesList(props.id, stringToSearch);
    } else if (props.mode === "search") {
      searchUsers(stringToSearch);
    }
  };

  return (
    <div>
      <SearchUser onChange={searchHandler} />
      {isLoading || storyLoader || likesLoader ? (
        <Loader />
      ) : props.mode === "likes" ? (
        likedBy.map((item) => {
          return (
            <UserItem
              key={item.username}
              username={item.username}
              profilePicture={item.profile_picture}
              mode={props.mode}
            />
          );
        })
      ) : props.mode !== "story-viewers" ? (
        allSearchedUsers.map((item) => {
          return (
            <UserItem
              key={item.username}
              username={item.username}
              profilePicture={item.profile_picture}
              mode={props.mode}
            />
          );
        })
      ) : (
        storyViewers.map((item) => {
          return (
            <UserItem
              key={item.username}
              username={item.username}
              profilePicture={item.profile_picture}
              mode={props.mode}
            />
          );
        })
      )}
    </div>
  );
};

export default ListViewUser;
