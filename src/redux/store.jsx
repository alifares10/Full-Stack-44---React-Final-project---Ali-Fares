import { applyMiddleware } from "redux";
import { localStorageMiddleware } from "@/lib/localStorageMiddleware";
import { legacy_createStore as createStore } from "redux";
import reducer from "./rootReducer";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(localStorageMiddleware)
);

export default store;
