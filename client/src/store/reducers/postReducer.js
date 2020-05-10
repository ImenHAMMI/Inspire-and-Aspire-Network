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
  ADD_COMMENT,
  ADDCOMMENT_SUCCESS,
  ADDCOMMENT_FAIL,
} from "../constants";

const initialState = {
  isLoading: false,
  isLoadingPost: false,
  posts: [],
  errors: [],
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POST:
      return { ...state, isLoading: true };
    case ADDPOST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [payload].concat(state.posts),
      };
    case ADDPOST_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case GET_POSTS:
      return { ...state, isLoading: true };
    case GETPOSTS_SUCCESS:
      return { ...state, isLoading: false, posts: payload };
    case GETPOSTS_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case GET_POSTS_BY_ID:
      return { ...state, isLoading: true };
    case GETPOSTSBYID_SUCCESS:
      return { ...state, isLoading: false, posts: payload };
    case GETPOSTSBYID_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case LIKE:
      return { ...state, isLoadingPost: true };
    case LIKE_SUCCESS:
      return {
        ...state,
        isLoadingPost: false,
        posts: state.posts.map((p) => (p._id === payload._id ? payload : p)),
      };
    case LIKE_FAIL:
      return { ...state, isLoadingPost: false, errors: payload };
    case UNLIKE:
      return { ...state, isLoadingPost: true };
    case UNLIKE_SUCCESS:
      return {
        ...state,
        isLoadingPost: false,
        posts: state.posts.map((p) => (p._id === payload._id ? payload : p)),
      };
    case UNLIKE_FAIL:
      return { ...state, isLoadingPost: false, errors: payload };
    case DELETE_POST:
      return { ...state, isLoading: true };
    case DELETEPOST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter((p) => p._id !== payload._id),
      };
    case DELETEPOST_FAIL:
      return { ...state, isLoading: false, errors: payload };
    case EDIT_POST:
      return { ...state, isLoading: true };
    case EDITPOST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((p) =>
          p._id === payload._id
            ? {
                ...p,
                title: payload.title,
                text: payload.text,
                quote: payload.quote,
              }
            : p
        ),
      };
    case EDITPOST_FAIL:
      return { ...state, isLoadingPost: false, errors: payload };
    case ADD_COMMENT:
      return { ...state, isLoadingPost: true };
    case ADDCOMMENT_SUCCESS:
      return {
        ...state,
        isLoadingPost: false,
        posts: state.posts.map((p) =>
          p._id === payload.idPost
            ? { ...p, comments: p.comments.concat(payload) }
            : p
        ),
      };
    case ADDCOMMENT_FAIL:
      return { ...state, isLoadingPost: false, errors: payload };

    default:
      return state;
  }
};
export default postReducer;
