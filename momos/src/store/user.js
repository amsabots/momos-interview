const initialState = {
  currentUser: null,
  ttl: 0,
};
//session established will be valid for the next 30 mins as dictated by the ttl value
export const current_user = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        currentUser: payload,
        ttl: new Date().getTime() + 30 * 60 * 1000,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
