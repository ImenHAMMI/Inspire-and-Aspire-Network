import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_USER,
  GET_USERS,
  GETUSERS_FAIL,
  GETUSERS_SUCCESS,
  GET_PROFILE,
  GETPROFILE_FAIL,
  GETPROFILE_SUCCESS,
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_FAIL,
} from "../constants/action-types";

const initialState = {
  isLoading: false,
  user: null,
  errors: [],
  isAuth: false,
  profile: null,
  profileUser: null,
  users: [],
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, isLoading: true };
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false, user: payload };
    case REGISTER_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case LOGIN_USER:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false };
    case LOGIN_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case AUTH_USER:
      return { ...state, isLoading: true };
    case AUTH_FAIL:
      return { ...state, isLoading: false, isAuth: false };
    case AUTH_SUCCESS:
      return { ...state, isLoading: false, isAuth: true, profile: payload };
    case GET_USERS:
      return { ...state, isLoading: true };
    case GETUSERS_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case GETUSERS_SUCCESS:
      return { ...state, isLoading: false, users: payload };
    case GET_PROFILE:
      return { ...state, isLoading: true };
    case GETPROFILE_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case GETPROFILE_SUCCESS:
      return { ...state, isLoading: false, profileUser: payload };
    case FOLLOW:
      return { ...state, isLoading: true };
    case FOLLOW_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case FOLLOW_SUCCESS:
      return { ...state, isLoading: false, profile: payload };
    default:
      return state;
  }
};

export default authReducer;
