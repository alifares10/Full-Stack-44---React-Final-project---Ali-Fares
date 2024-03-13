import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { applyMiddleware } from "redux";
import { localStorageMiddleware } from "@/lib/localStorageMiddleware";
import { legacy_createStore as createStore } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
