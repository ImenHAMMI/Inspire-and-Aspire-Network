import axios from "axios";
import {
  GET_POSTS,
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  ADD_POST,
  ADDPOST_SUCCESS,
  ADDPOST_FAIL,
} from "../constants/action-types";

//get Posts By User
export const getPosts = () => async (dispatch) => {
  dispatch({
    type: GET_POSTS,
  });
  try {
    const searchRes = await axios.get("/posts");
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
