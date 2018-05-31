import React from "react";
import createPlugin from "./createPlugin";
import HTML5Video from "./HTML5Video";

const textPlugin = createPlugin({
  Component: HTML5Video,
  name: "ory-editor-plugins/test",
  text: "TEST",
  description: "test Plugin",
  IconComponent: <div>Text</div>
});

export { textPlugin };
