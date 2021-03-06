import React from "react";
import createPlugin from "../createPlugin";

const Icon = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="rgb(255, 255, 255)"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </svg>
);

const View = ({
  state: { text, url, borderRadius, bgColor, textColor },
  focused
}) => {
  return (
    <div className="button_link_outer">
      <a
        {...(focused ? {} : { href: url })}
        style={{ borderRadius, backgroundColor: bgColor, color: textColor }}
        className="button_link"
      >
        {text}
      </a>
    </div>
  );
};

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/button",
  text: "Кнопка",
  description: "Кнопка с ссылкой",
  IconComponent: <Icon />,
  createInitialState: () => ({
    text: "Надпись на кнопке",
    url: "",
    borderRadius: "5px",
    bgColor: "#3a7ad9",
    textColor: "#fff"
  })
});
