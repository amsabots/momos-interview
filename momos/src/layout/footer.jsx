import React from "react";
import { color_scheme } from "../constants";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: color_scheme.subtle,
        width: "100%",
        minHeight: "40px",
        bottom: 0,
        zIndex: 100,
      }}
      className="d-flex w-100 align-items-center"
    >
      <div className="text-center text-light w-100">
        Built with <i className="fa fa-heart" aria-hidden="true"></i>
        <a
          href="https://stackoverflow.com/users/11214377/andrew-mititi"
          className="text-light"
        >
          {" "}
          andrew@stackoverflow
        </a>
      </div>
    </div>
  );
};

export { Footer };
