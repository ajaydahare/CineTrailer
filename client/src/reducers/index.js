import { combineReducers } from "redux";
import auth from "./authReducer";
import packs from "./packsReducer";

export default combineReducers({
  auth,
  packs,
});
