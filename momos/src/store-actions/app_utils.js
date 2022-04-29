export const actions_app_utils = {
  is_loading: function (load) {
    return {
      payload: load,
      type: "LOADING",
    };
  },
};
