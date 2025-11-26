import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import { HomeAdapter } from "../../../adapters/home.adapter";

const usePost = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedBy, setLikedBy] = useState([]);

  const cookie = new Cookies();
  const token = cookie.get("token");

  const modalHandler = (value) => {
    setIsModalOpen(value);
  };

  const getAllPosts = async () => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.getAllPosts();
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setAllPosts(response.data);
    setIsLoading(false);
  };

  const getSinglePost = async (id) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.getSinglePost(id);
    console.log("SIN", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
    setCurrentPost(response.data);
  };

  const editPost = async (id, caption) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.editPost(id, caption);
    console.log("SIN", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
    toast("Caption updated");
  };

  const deletePost = async (id) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.deletePost(id);
    console.log("SIN", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
    toast("Post deleted");
  };

  const toggleLike = async (id) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.toggleLike(id);
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

  const getAllComments = async (id) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.getAllComments(id);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }

    setAllComments(response.data);
    setIsLoading(false);
  };

  const deleteComment = async (id) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.deleteComment(id);
    console.log("RES", response);
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

  const addComment = async (id, text) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.addComment(id, text);
    // console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);

      return;
    }
    setIsLoading(false);
  };

  const viewLikesList = async (id, stringToSearch) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.viewLikesList(id, stringToSearch);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);

      return;
    }
    setLikedBy(response.data.liked_users);
    setIsLoading(false);
  };

  return {
    allPosts,
    isLoading,
    allComments,
    currentPost,
    isModalOpen,
    likedBy,
    getAllPosts,
    getSinglePost,
    toggleLike,
    addComment,
    getAllComments,
    deleteComment,
    modalHandler,
    editPost,
    deletePost,
    viewLikesList,
  };
};

export default usePost;
