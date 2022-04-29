import React from "react";

const CircularImage = ({ url = require("../assets/user.png"), size = 100 }) => {
  return (
    <img
      src={url}
      alt="img"
      width={size}
      height={size}
      style={{ borderRadius: size / 2 }}
    />
  );
};

export { CircularImage };
