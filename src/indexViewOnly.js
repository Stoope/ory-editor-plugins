import React from "react";
import createPlugin from "./createPlugin";
import HTML5Video from "./HTML5Video/View";

const textPlugin = createPlugin({
  Component: HTML5Video,
  name: "ory-editor-plugins/html5video",
  text: "html5video",
  description: "display html5video",
  IconComponent: <div>Text</div>
});

export { textPlugin };
