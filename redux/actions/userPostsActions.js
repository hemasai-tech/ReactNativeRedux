import {
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
} from '../actionTypes';

export const getUserPostsRequest = (id) => ({
  type: GET_USER_POSTS_REQUEST,
  payload:id
});

export const getUserPostsSuccess = posts => ({
  type: GET_USER_POSTS_SUCCESS,
  payload: posts,
});

export const getUserPostsFailure = error => ({
  type: GET_USER_POSTS_FAILURE,
  payload: error,
});
