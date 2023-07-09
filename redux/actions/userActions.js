import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
  } from '../actionTypes';
  
  export const getUsersRequest = () => ({
    type: GET_USERS_REQUEST,
  });
  
  export const getUsersSuccess = (users) => ({
    type: GET_USERS_SUCCESS,
    payload: users,
  });
  
  export const getUsersFailure = (error) => ({
    type: GET_USERS_FAILURE,
    payload: error,
  });
  