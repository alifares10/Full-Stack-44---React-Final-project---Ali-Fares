const initialState = {
  user: {
    id: "",
    email: "",
    isAuth: false,
    token: "",
    role: "",
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {
          id: "",
          email: "",
          isAuth: false,
          token: "",
          role: "",
        },
      };

    default:
      return state;
  }
};
