import axios from "axios";

export class HomeAdapter {
  instance;
  constructor(baseURL, token) {
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000,
      timeoutErrorMessage: "Request timed out",
    });
  }

  getAllPosts = async () => {
    try {
      const response = await this.instance.get(
        `${process.env.NEXT_PUBLIC_URL}/homepage/posts`
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getSinglePost = async (post_id) => {
    console.log("POS", post_id);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/posts/get-post`,
        { post_id }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  editPost = async (post_id, caption) => {
    console.log("POS", post_id, caption);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/posts/edit-post`,
        { post_id, caption }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  deletePost = async (post_id) => {
    console.log("POS", post_id);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/posts/delete-post`,
        { post_id }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  toggleLike = async (post_id) => {
    try {
      console.log("POST", post_id);
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/posts/toggle-like`,
        { post_id }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  viewLikesList = async (post_id, username) => {
    try {
      console.log("POST", post_id);
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/posts/search-like`,
        { post_id, username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getAllComments = async (post_id) => {
    try {
      console.log("POST", post_id);
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/posts/view-comments`,
        { post_id }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  addComment = async (post_id, comment_message) => {
    try {
      console.log("POST", post_id);
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/posts/make-comment`,
        { post_id, comment_message }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  deleteComment = async (comment_id) => {
    try {
      console.log("CPMME", comment_id);
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/posts/delete-comment`,
        { comment_id }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getAllStories = async () => {
    try {
      const response = await this.instance.get(
        `${process.env.NEXT_PUBLIC_URL}/story/friends-stories`
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  deleteStory = async (story_id) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/story/delete-story`,
        { story_id }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getAllStoriesOfUser = async (username, index) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/story/view-stories`,
        { username, index }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  updateViewersList = async (story_id) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/story/view-story`,
        { story_id }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getStoryInfo = async (story_id) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/story/visibility`,
        { story_id }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  updateHiddenUsers = async (story_id, hidden_usernames) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/story/update-visibility`,
        { story_id, hidden_usernames }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };
  getStoryViewers = async (story_id, username) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/story/search-viewer`,
        { story_id, username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getUserProfile = async (username) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/user-profile`,
        { username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getSearchedUser = async (username) => {
    // console.log("USE", username);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/search-user`,
        { username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getFollowingSearchedUsers = async (username, search_string) => {
    // console.log("USE", username);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/search-following`,
        { username, search_string }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  getSearchedFollowers = async (username, search_string) => {
    // console.log("USE", username);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/search-followers`,
        { username, search_string }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  followStatus = async (username) => {
    console.log("USE", username);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/follow`,
        { username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };
  unfollowUser = async (username) => {
    console.log("USE", username);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/unfollow`,
        { username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  removeFollower = async (username) => {
    console.log("USE", username);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/remove-follower`,
        { username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  allNotifications = async () => {
    try {
      const response = await this.instance.get(
        `${process.env.NEXT_PUBLIC_URL}/user/view-notifications`
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  acceptRequest = async (username) => {
    console.log("USER", username);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/accept-follow-request`,
        { username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };

  cancelRequest = async (username) => {
    console.log("USER", username);
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/cancel-request`,
        { username }
      );
      return response;
    } catch (error) {
      console.error(error);
      return { ...error.response, error };
    }
  };
}
