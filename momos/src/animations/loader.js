import React from "react";
import Lottie from "lottie-react";
import * as Loader from "./loading.json";

const LoaderAnimation = ({ size = 100 }) => {
  return (
    <Lottie
      loop={true}
      autoplay={true}
      animationData={Loader}
      style={{ width: size, height: size }}
    />
  );
};

export { LoaderAnimation };
