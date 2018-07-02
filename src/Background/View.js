import React from "react";
import createPlugin from "../createPlugin";

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="rgb(255, 255, 255)"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
  </svg>
);

const View = ({ state: { background, darken, type, color }, children }) => {
  let bg = null;
  if (type === "image") {
    bg = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, ${darken}), rgba(0, 0, 0, ${darken})), url('${background}')`
    };
  } else if (type === "color") {
    bg = { backgroundColor: color };
  }
  return (
    <div
      style={{
        ...bg,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "white",
        padding: "12px"
      }}
    >
      {children}
    </div>
  );
};

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/background",
  text: "Задний фон",
  description: "Секция с изменяемым задним фоном",
  IconComponent: <Icon />,
  createInitialState: () => ({
    background: "",
    darken: 0.3,
    type: "image",
    color: ""
  })
});
