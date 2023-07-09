import {call, put, takeLatest} from 'redux-saga/effects';
import {GET_USER_POSTS_REQUEST} from '../actionTypes';
import axios from 'axios';
import {
  getUserPostsFailure,
  getUserPostsSuccess,
} from '../actions/userPostsActions';

function* getUserPostsSaga(action) {
  console.log(action.payload);
  let id = action.payload;
  try {
    const url = id
      ? `https://jsonplaceholder.typicode.com/posts/${id}`
      : 'https://jsonplaceholder.typicode.com/posts';
    const response = yield call(axios.get, url);
    console.log(response.data.body, 'res in userposts saga');
    yield put(getUserPostsSuccess(response.data));
  } catch (error) {
    yield put(getUserPostsFailure(error.message));
  }
}

export function* watchUserPosts() {
  yield takeLatest(GET_USER_POSTS_REQUEST, getUserPostsSaga);
}
