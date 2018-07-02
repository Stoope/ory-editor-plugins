import React from "react";
import createPlugin from "../createPlugin";
import ReactPlayer from "react-player";

const Icon = ({ style }) => (
  <svg
    style={style}
    fill="rgb(255, 255, 255)"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const View = ({ state }) => {
  return state.src ? (
    <ReactPlayer
      url={state.src}
      height="100%"
      width="100%"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%"
      }}
    />
  ) : (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          textAlign: "center"
        }}
      >
        <Icon
          style={{
            width: "100%",
            height: "auto",
            padding: "0",
            fill: "rgb(170, 170, 170)",
            textAlign: "center",
            minWidth: 64,
            minHeight: 64,
            maxHeight: 256
          }}
        />
      </div>
    </div>
  );
};

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/video",
  text: "Видео",
  description: "Отображение видео по url",
  IconComponent: <Icon />
});
