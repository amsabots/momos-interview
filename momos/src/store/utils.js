const initialState = {
  ui_refresh: 0,
  loading: false,
};

export const app_utils = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "RELOAD":
      return { ...state, ui_refresh: Math.random() };
    case "LOADING":
      return { ...state, loading: payload };
    default:
      return state;
  }
};
