import * as api from "../api/backendRequests";

export const signUp = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.userSignUp(formData);
    dispatch({ type: "AUTH", payload: data });
    dispatch({ type: "END_LOADING" });
    history.push("/");
  } catch (error) {
    if (error.response) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      dispatch({ type: "END_LOADING" });
    }
  }
};

export const signIn = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.userSignIn(formData);
    dispatch({ type: "AUTH", payload: data });
    dispatch({ type: "END_LOADING" });
    history.push("/");
  } catch (error) {
    if (error.response) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      dispatch({ type: "END_LOADING" });
    }
  }
};
