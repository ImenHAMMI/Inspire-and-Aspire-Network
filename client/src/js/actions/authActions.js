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
} from "../constants/action-types";

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
