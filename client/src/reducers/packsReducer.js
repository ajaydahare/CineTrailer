const packsReducer = (
  state = {
    packsData: [],
    activePack: null,
    expireIn: null,
    isLoading: true,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "GET_PACKS":
      return { ...state, packsData: action.payload };
    case "ACTIVE_PACK":
      return {
        ...state,
        activePack: action.payload?.activeSubscription,
        expireIn: action.payload?.expireIn,
      };
    case "CANCEL_PACK":
      return {
        ...state,
        activePack: action.payload,
        expireIn: null,
      };
    case "ERROR":
      return { ...state, error: action?.payload };
    default:
      return state;
  }
};

export default packsReducer;
