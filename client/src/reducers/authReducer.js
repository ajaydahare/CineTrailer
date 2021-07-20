const authReducer = (state = { authData: null, error: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem(
        "movieHubProfile",
        JSON.stringify({ ...action?.payload })
      );
      return { ...state, authData: action?.payload };
    case "LOGOUT":
      localStorage.removeItem("movieHubProfile");
      return { ...state, authData: null };
    case "ERROR":
      return { ...state, error: action?.payload };
    default:
      return state;
  }
};

export default authReducer;
