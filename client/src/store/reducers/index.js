import { combineReducers } from "redux";
import currentUser from "./currentUser";
import error from "./error";
import chatrooms from "./chatrooms";

export default combineReducers({
    currentUser,
    error,
    chatrooms,
});
