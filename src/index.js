import React from "react";
import createPlugin from "./createPlugin";
import Component from "./TestComponent";

const textPlugin = createPlugin({
  Component,
  name: "ory-editor-plugins/test",
  text: "TEST",
  description: "test Plugin",
  IconComponent: <div>Text</div>
});

export { textPlugin };
