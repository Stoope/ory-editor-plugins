import React from "react";
import createPlugin from "../createPlugin";

const Icon = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="rgb(255, 255, 255)"
  >
    <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const View = ({ state }) => {
  return (
    <div className="ql-editor">
      <div
        className="ql-container"
        dangerouslySetInnerHTML={{
          __html: state.html
        }}
      />
    </div>
  );
};

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/text",
  text: "Текст",
  description: "Область с текстом.",
  IconComponent: <Icon />
});
