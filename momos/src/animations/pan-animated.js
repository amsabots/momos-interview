import React from "react";
import Lottie from "lottie-react";
import * as Pan from "./pan-flip.json";

const PanFlip = ({ size = 100 }) => {
  return (
    <Lottie
      loop={true}
      autoplay={true}
      animationData={Pan}
      sizes={size}
      style={{ width: size, height: size }}
    />
  );
};

export { PanFlip };
