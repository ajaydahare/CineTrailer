import * as api from "../api/backendRequests";

export const getPacks = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.getPacks();
    dispatch({ type: "GET_PACKS", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    if (error.response) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      dispatch({ type: "END_LOADING" });
    }
  }
};

export const packPurchase = (userId, packId, paymentResult) => async (
  dispatch
) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.userMakePurchase(userId, packId, paymentResult);
    dispatch({ type: "ACTIVE_PACK", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    if (error.response) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      dispatch({ type: "END_LOADING" });
    }
  }
};

export const getActivePack = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.userActivePack(userId);
    dispatch({ type: "ACTIVE_PACK", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    if (error.response) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      dispatch({ type: "END_LOADING" });
    }
  }
};

export const cancelPack = (userId, history) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.cancelPack(userId);
    dispatch({ type: "CANCEL_PACK", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    if (error.response) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      dispatch({ type: "END_LOADING" });
    }
  }
};
