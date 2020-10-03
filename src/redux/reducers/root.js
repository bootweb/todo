import { combineReducers } from "redux";
import serverResponse from "./serverResponse_reducer";
import session from "./session_reducer";

export default combineReducers({
  session,
  serverResponse
});