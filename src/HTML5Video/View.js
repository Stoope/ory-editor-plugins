import React from "react";
import createPlugin from "../createPlugin";

const View = ({ state: { url = "" } }) => (
  <video autoPlay controls loop muted width="100%">
    <source src={url} type={`video/${url.split(".").pop()}`} />
  </video>
);

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/html5video",
  text: "html5video",
  description: "display html5video",
  IconComponent: <div>Text</div>
});
