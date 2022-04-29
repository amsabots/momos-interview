export const action_current_user = {
  login: function (user) {
    return {
      type: "LOGIN",
      payload: user,
    };
  },
  logout: function () {
    return {
      type: "LOGOUT",
    };
  },
};
