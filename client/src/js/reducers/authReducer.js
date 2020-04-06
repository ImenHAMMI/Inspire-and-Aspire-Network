import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_USER
} from "../constants/action-types";

const initialState = {
  isLoading: false,
  user: null,
  errors: [],
  isAuth: false,
  profile: null
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
    default:
      return state;
  }
};

export default authReducer;
