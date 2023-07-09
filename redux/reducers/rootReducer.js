import { combineReducers } from "redux";
import userPostsReducer from "./userPostsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userPosts: userPostsReducer,
  users: userReducer,
  // Add more reducers here if needed
});

export default rootReducer;
