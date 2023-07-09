import {
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
} from '../actionTypes';

const initialState = {
  loading: false,
  posts: [],
  error: null,
};

const userPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case GET_USER_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userPostsReducer;
