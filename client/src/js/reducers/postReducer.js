import {
  GET_POSTS,
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  ADD_POST,
  ADDPOST_SUCCESS,
  ADDPOST_FAIL,
} from "../constants/action-types";

const initialState = {
  isLoading: false,
  posts: [],
  post: null,
  errors: [],
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POST:
      return { ...state, isLoading: true };
    case ADDPOST_SUCCESS:
      return { ...state, isLoading: false, post: payload };
    case ADDPOST_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case GET_POSTS:
      return { ...state, isLoading: true };
    case GETPOSTS_SUCCESS:
      return { ...state, isLoading: false, posts: payload };
    case GETPOSTS_FAIL:
      return { ...state, isLoading: false, errors: payload };
    default:
      return state;
  }
};
export default postReducer;
