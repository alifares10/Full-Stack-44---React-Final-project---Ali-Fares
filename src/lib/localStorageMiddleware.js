// localStorageMiddleware.js
export const localStorageMiddleware = (store) => (next) => (action) => {
  // Execute the action
  const result = next(action);

  // Serialize the Redux state
  const serializedState = JSON.stringify(store.getState());

  // Save the serialized state to local storage
  localStorage.setItem("reduxState", serializedState);

  return result;
};
