import React from "react";
import createPlugin from "../createPlugin";
import Subject from "@material-ui/icons/Subject";
// import { lineBreakSerializer, defaultPlugins } from "./hooks";
import Html from "slate-html-serializer";
// import AlignmentPlugin from "./plugins/alignment";
// import BlockquotePlugin from "./plugins/blockquote";
// import CodePlugin from "./plugins/code";
// import EmphasizePlugin from "./plugins/emphasize";
// import HeadingsPlugin from "./plugins/headings";
// import LinkPlugin from "./plugins/link";
// import ListsPlugin from "./plugins/lists";
import ParagraphPlugin, { P } from "./plugins/paragraph";

const DEFAULT_NODE = P;
export const defaultPlugins = [
  new ParagraphPlugin()
  // new EmphasizePlugin(),
  // new HeadingsPlugin({ DEFAULT_NODE }),
  // new LinkPlugin(),
  // new CodePlugin({ DEFAULT_NODE }),
  // new ListsPlugin({ DEFAULT_NODE }),
  // new BlockquotePlugin({ DEFAULT_NODE }),
  // new AlignmentPlugin()
  // new KatexPlugin({ DEFAULT_NODE })
];

export const lineBreakSerializer = {
  deserialize(el) {
    if (el.tagName.toLowerCase() === "br") {
      return { kind: "text", text: "\n" };
    }
  },
  serialize(object, children) {
    if (object.type === "text" || children === "\n") {
      return <br />;
    }
  }
};

export const html = new Html({
  rules: [...defaultPlugins, lineBreakSerializer]
});

const View = ({ state: { editorState } }) => {
  console.log(editorState);
  return (
    <div dangerouslySetInnerHTML={{ __html: html.serialize(editorState) }} />
  );
};

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/slate",
  version: "0.0.1",
  IconComponent: <Subject />,
  text: "Текст",
  description: "Область с текстом.",

  allowInlineNeighbours: true
});
