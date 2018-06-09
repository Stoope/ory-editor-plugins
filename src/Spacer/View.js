import React from "react";
import createPlugin from "../createPlugin";

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="rgb(255, 255, 255)"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const View = ({ state }) => <div style={{ height: state.height }} />;

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/spacer",
  text: "Пространство",
  description: "Пустое пространство с заданным размером",
  IconComponent: <Icon />
});