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
  EDIT_POST,
  EDITPOST_SUCCESS,
  EDITPOST_FAIL,
  DELETE_POST,
  DELETEPOST_SUCCESS,
  DELETEPOST_FAIL,
  GET_POSTS_BY_ID,
  GETPOSTSBYID_SUCCESS,
  GETPOSTSBYID_FAIL,
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

//get Posts By Id profile
export const getPostsByID = (id) => async (dispatch) => {
  dispatch({
    type: GET_POSTS_BY_ID,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const searchRes = await axios.get(`/posts${id}`, config);
    console.log(searchRes);
    dispatch({
      type: GETPOSTSBYID_SUCCESS,
      payload: searchRes.data,
    });
  } catch (error) {
    dispatch({ type: GETPOSTSBYID_FAIL, payload: error.response.data.errors });
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
    console.log(addRes);
    dispatch({
      type: ADDPOST_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({ type: ADDPOST_FAIL, payload: error.response.data.errors });
  }
};

//Edit post
export const editPost = (id, updatePost) => async (dispatch) => {
  dispatch({
    type: EDIT_POST,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const updateRes = await axios.put(`/editpost${id}`, updatePost, config);

    dispatch({
      type: EDITPOST_SUCCESS,
      payload: updateRes.data,
    });
  } catch (error) {
    dispatch({
      type: EDITPOST_FAIL,
      payload: error.response.data.errors,
    });
  }
};

//Delete post
export const deletePost = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_POST,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const deleteRes = await axios.delete(`/post${id}`, config);
    // console.log(deleteRes);
    dispatch({
      type: DELETEPOST_SUCCESS,
      payload: deleteRes.data,
    });
  } catch (error) {
    dispatch({
      type: DELETEPOST_FAIL,
      payload: error.response.data.errors,
    });
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
