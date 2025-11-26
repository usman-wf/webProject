import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import { HomeAdapter } from "../../../adapters/home.adapter";

const useStory = () => {
  const [allStories, setAllStories] = useState([]);
  const [currentStory, setCurrentStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followersHideStatus, setFollowersHideStatus] = useState([]);
  const [hiddenUsers, setHiddenUsers] = useState([]);
  const [storyViewers, setStoryViewers] = useState([]);

  const cookie = new Cookies();
  const token = cookie.get("token");

  const modalHandler = (value) => {
    setIsModalOpen(value);
  };

  const getAllStories = async () => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.getAllStories();
    console.log("STORIES", response);
    if (response.error) {
      //   console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setAllStories(response.data.friends_with_stories);
    setIsLoading(false);
  };

  const deleteStory = async (id) => {
    console.log("ID", id);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.deleteStory(id);
    console.log("Stor", response);
    if (response.error) {
      //   console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
  };

  const getStoriesOfUser = async (username, index) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.getAllStoriesOfUser(username, index);
    console.log("Stor", response);
    if (response.error) {
      //   console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setCurrentStory(response.data);
    setIsLoading(false);
    return response.data.total_stories;
  };

  const updateViewersList = async (id) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.updateViewersList(id);
    // console.log("upd", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
  };

  const getStoryInformation = async (id) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.getStoryInfo(id);
    console.log("upd", response);
    if (response.error) {
      // console.log("IN", response);
      setIsLoading(false);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
    setFollowersHideStatus(response.data.visibility);
    setHiddenUsers(
      response.data.visibility
        .filter((user) => user.is_hidden)
        .map((user) => user.username)
    );
  };

  const updateHiddenUsers = async (id) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.updateHiddenUsers(id, hiddenUsers);
    console.log("upd", response);
    if (response.error) {
      // console.log("IN", response);
      setIsLoading(false);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
    setIsLoading(false);
  };

  const getStoryiewers = async (id, stringToSearch) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.getStoryViewers(id, stringToSearch);
    console.log("upd", response);
    if (response.error) {
      // console.log("IN", response);
      setIsLoading(false);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
    setStoryViewers(response.data.viewers);
    setIsLoading(false);
  };

  const prepareHiddenUsers = (username) => {
    const updatedHiddenUsers = [...hiddenUsers];
    const index = updatedHiddenUsers.indexOf(username);

    if (index !== -1) {
      updatedHiddenUsers.splice(index, 1);
    } else {
      updatedHiddenUsers.push(username);
    }
    setHiddenUsers(updatedHiddenUsers);
    console.log("NOW SETTING", updatedHiddenUsers);
  };

  return {
    allStories,
    isModalOpen,
    storyViewers,
    isLoading,
    currentStory,
    followersHideStatus,
    getAllStories,
    getStoriesOfUser,
    updateViewersList,
    modalHandler,
    deleteStory,
    getStoryInformation,
    prepareHiddenUsers,
    updateHiddenUsers,
    getStoryiewers,
  };
};

export default useStory;
