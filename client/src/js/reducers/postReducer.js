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

const initialState = {
  isLoading: false,
  posts: [],
  post: null,
  Newpost: null,
  errors: [],
  avatarsLikes: [],
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POST:
      return { ...state, isLoading: true };
    case ADDPOST_SUCCESS:
      return { ...state, isLoading: false, Newpost: payload };
    case ADDPOST_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case GET_POSTS:
      return { ...state, isLoading: true };
    case GETPOSTS_SUCCESS:
      return { ...state, isLoading: false, posts: payload };
    case GETPOSTS_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case LIKE:
      return { ...state, isLoading: true };
    case LIKE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((p) => (p._id === payload._id ? payload : p)),
      };
    case LIKE_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case UNLIKE:
      return { ...state, isLoading: true };
    case UNLIKE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((p) => (p._id === payload._id ? payload : p)),
      };
    case UNLIKE_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case GETAVATARSLIKES:
      return { ...state, isLoading: true };
    case GETAVATARSLIKES_SUCCESS:
      return { ...state, isLoading: false, avatarsLikes: payload };
    case GETAVATARSLIKES_FAIL:
      return { ...state, isLoading: false, errors: payload };
    default:
      return state;
  }
};
export default postReducer;
