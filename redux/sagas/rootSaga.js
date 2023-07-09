import { all } from 'redux-saga/effects';
import { watchGetUsers } from './userSaga';
import { watchUserPosts } from './userPostsSaga';

export function* rootSaga() {
  yield all([
    watchUserPosts(),
    watchGetUsers()
    // Add more sagas here if needed
  ]);
}
