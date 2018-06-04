/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from "react";
import BoldIcon from "@material-ui/icons/FormatBold";
import ItalicIcon from "@material-ui/icons/FormatItalic";
import UnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import { makeTagMark, ToolbarButton } from "../helpers";
import Plugin from "./Plugin";

export const STRONG = "EMPHASIZE/STRONG";
export const EM = "EMPHASIZE/EM";
export const U = "EMPHASIZE/U";

// eslint-disable-next-line react/display-name
const createButton = (type, icon) => ({ editorState, onChange }) => {
  const onClick = e => {
    e.preventDefault();

    onChange(
      editorState
        .transform()
        .toggleMark(type)
        .apply()
    );
  };

  const isActive =
    editorState && editorState.marks.some(mark => mark.type === type);

  return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />;
};

export default class EmphasizePlugin extends Plugin {
  props;

  name = "emphasize";

  marks = {
    [STRONG]: makeTagMark("strong"),
    [EM]: makeTagMark("em"),
    [U]: makeTagMark("u")
  };

  onKeyDown = (e, data, state) => {
    if (data.isMod) {
      let mark;

      switch (data.key) {
        case "b":
          mark = STRONG;
          break;
        case "i":
          mark = EM;
          break;
        case "u":
          mark = U;
          break;
        default:
          return;
      }

      return state
        .transform()
        .toggleMark(mark)
        .apply();
    }
  };

  hoverButtons = [
    createButton(STRONG, <BoldIcon />),
    createButton(EM, <ItalicIcon />),
    createButton(U, <UnderlinedIcon />)
  ];

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case "strong":
      case "b":
        return {
          kind: "mark",
          type: STRONG,
          nodes: next(el.childNodes)
        };
      case "em":
      case "i":
        return {
          kind: "mark",
          type: EM,
          nodes: next(el.childNodes)
        };
      case "u":
        return {
          kind: "mark",
          type: U,
          nodes: next(el.childNodes)
        };
    }
  };

  serialize = (object, children) => {
    if (object.kind !== "mark") {
      return;
    }
    switch (object.type) {
      case STRONG:
        return <strong>{children}</strong>;
      case EM:
        return <em>{children}</em>;
      case U:
        return <u>{children}</u>;
    }
  };
}
