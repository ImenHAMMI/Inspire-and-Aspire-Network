import axios from "axios";
import {
  GET_POSTS,
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  ADD_POST,
  ADDPOST_SUCCESS,
  ADDPOST_FAIL,
  LIKE,
  LIKE_SUCCESS,
  LIKE_FAIL,
  UNLIKE,
  UNLIKE_SUCCESS,
  UNLIKE_FAIL,
  GETAVATARSLIKES,
  GETAVATARSLIKES_SUCCESS,
  GETAVATARSLIKES_FAIL,
} from "../constants/action-types";

//get Posts By User
export const getPosts = () => async (dispatch) => {
  dispatch({
    type: GET_POSTS,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const searchRes = await axios.get("/posts", config);
    // console.log(searchRes);
    dispatch({
      type: GETPOSTS_SUCCESS,
      payload: searchRes.data,
    });
  } catch (error) {
    dispatch({ type: GETPOSTS_FAIL, payload: error.response.data.errors });
  }
};

// add post
export const addPost = (post) => async (dispatch) => {
  dispatch({
    type: ADD_POST,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  try {
    const addRes = await axios.post("/addpost", post, config);
    dispatch({
      type: ADDPOST_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({ type: ADDPOST_FAIL, payload: error.response.data.errors });
  }
};

//Like post
export const likePost = (id) => async (dispatch) => {
  dispatch({
    type: LIKE,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const putRes = await axios.put(`/likePost${id}`, null, config);
    // console.log(putRes);
    dispatch({
      type: LIKE_SUCCESS,
      payload: putRes.data,
    });
  } catch (error) {
    dispatch({ type: LIKE_FAIL, payload: error.response.data.errors });
  }
};

//Like post
export const unLikePost = (id) => async (dispatch) => {
  dispatch({
    type: UNLIKE,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const putRes = await axios.put(`/unlikePost${id}`, null, config);
    // console.log(putRes);
    dispatch({
      type: UNLIKE_SUCCESS,
      payload: putRes.data,
    });
    // getPosts();
  } catch (error) {
    dispatch({ type: UNLIKE_FAIL, payload: error.response.data.errors });
  }
};

//getAvatarsLike
export const getAvatarsLike = (id) => async (dispatch) => {
  dispatch({
    type: GETAVATARSLIKES,
  });

  try {
    const getRes = await axios.get(`/getAvatarsLike${id}`);
    // console.log(getRes);
    dispatch({
      type: GETAVATARSLIKES_SUCCESS,
      payload: getRes.data,
    });
  } catch (error) {
    dispatch({
      type: GETAVATARSLIKES_FAIL,
      payload: error.response.data.errors,
    });
  }
};
