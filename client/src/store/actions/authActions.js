import axios from "axios";
import {
  REGISTER_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_USER,
  AUTH_FAIL,
  AUTH_SUCCESS,
  GET_USERS,
  GETUSERS_SUCCESS,
  GETUSERS_FAIL,
  GET_PROFILE,
  GETPROFILE_SUCCESS,
  GETPROFILE_FAIL,
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_FAIL,
  ADD_IMG,
  ADDIMG_SUCCESS,
  ADDIMG_FAIL,
  EDIT_AVATAR,
  EDITAVATAR_SUCCESS,
  EDITAVATAR_FAIL,
  EDIT_PROFILE,
  EDITPROFILE_SUCCESS,
  EDITPROFILE_FAIL,
} from "../constants";

//REGISTER
export const register = (user) => async (dispatch) => {
  dispatch({
    type: REGISTER_USER,
  });
  try {
    const searchRes = await axios.post("/register", user);
    // console.log(searchRes);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: searchRes.data,
    });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.errors });
  }
};

//LOGIN
export const login = (userCredential) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER,
  });
  try {
    const searchRes = await axios.post("/login", userCredential);
    localStorage.setItem("token", searchRes.data.token);
    dispatch({ type: LOGIN_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.errors });
  }
};

//authentification
export const isAuthorized = () => async (dispatch) => {
  dispatch({
    type: AUTH_USER,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const isAuth = await axios.get("/current", config);
    // console.log(isAuth);
    dispatch({
      type: AUTH_SUCCESS,
      payload: isAuth.data,
    });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response.data.errors });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: GET_USERS,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const searchRes = await axios.get("/users", config);
    dispatch({
      type: GETUSERS_SUCCESS,
      payload: searchRes.data,
    });
  } catch (error) {
    dispatch({ type: GETUSERS_FAIL, payload: error.response.data.errors });
  }
};

// get Profile By ID
export const getProfileByID = (id) => async (dispatch) => {
  dispatch({
    type: GET_PROFILE,
  });
  try {
    const searchRes = await axios.get(`/profile${id}`);
    dispatch({
      type: GETPROFILE_SUCCESS,
      payload: searchRes.data,
    });
  } catch (error) {
    dispatch({ type: GETPROFILE_FAIL, payload: error.response.data.errors });
  }
};

//Edit profile
export const editProfile = (id, newData) => async (dispatch) => {
  dispatch({
    type: EDIT_PROFILE,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const updateRes = await axios.put(`/editprofile${id}`, newData, config);

    dispatch({
      type: EDITPROFILE_SUCCESS,
      payload: updateRes.data,
    });
  } catch (error) {
    dispatch({
      type: EDITPROFILE_FAIL,
      payload: error.response.data.errors,
    });
  }
};

//addImg
export const uploadImg = (img) => async (dispatch) => {
  dispatch({
    type: ADD_IMG,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
      //'content-type': 'multipart/form-data'
    },
  };
  try {
    const putRes = await axios.post("/upload", img, config);
    // console.log(putRes);
    dispatch({
      type: ADDIMG_SUCCESS,
      payload: putRes.data,
    });
  } catch (error) {
    dispatch({ type: ADDIMG_FAIL, payload: error.response.data.errors });
  }
};

//editAvatar
export const editAvatar = (img) => async (dispatch) => {
  dispatch({
    type: EDIT_AVATAR,
  });

  try {
    const putRes = await axios.post("/editAvatar", img);

    dispatch({
      type: EDITAVATAR_SUCCESS,
      payload: putRes.data,
    });
  } catch (error) {
    dispatch({ type: EDITAVATAR_FAIL, payload: error.response.data.errors });
  }
};

//follow user
export const follow = (id) => async (dispatch) => {
  dispatch({
    type: FOLLOW,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const putRes = await axios.put(`/profile${id}`, null, config);
    console.log(putRes);
    dispatch({
      type: FOLLOW_SUCCESS,
      payload: putRes.data,
    });
  } catch (error) {
    dispatch({ type: FOLLOW_FAIL, payload: error.response.data.errors });
  }
};
