import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {GET_USERS_REQUEST} from '../actionTypes';
import {getUsersFailure, getUsersSuccess} from '../actions/userActions';

function* getUsersSaga() {
  try {
    const response = yield call(
      axios.get,
      'https://jsonplaceholder.typicode.com/users',
    );
    yield put(getUsersSuccess(response.data));
  } catch (error) {
    yield put(getUsersFailure(error.message));
  }
}

export function* watchGetUsers() {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
}
