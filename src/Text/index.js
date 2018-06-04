import Subject from "@material-ui/icons/Subject";
import { compose, flatten, map, mergeAll, prop, pathOr } from "ramda";
import { Html } from "slate";
import React from "react";
import { ActionTypes } from "redux-undo";
import Component from "./Component";
import * as hooks from "./hooks";

const createNodes = compose(mergeAll, map(prop("nodes")));
const createMarks = compose(mergeAll, map(prop("marks")));
const createPlugins = compose(flatten, map(prop("plugins")));

export const createInitialState = hooks.createInitialState;

export const html = new Html({
  rules: [...hooks.defaultPlugins, hooks.lineBreakSerializer]
});

export default (plugins = hooks.defaultPlugins) => {
  const props = {};
  props.schema = {
    nodes: createNodes(plugins),
    marks: createMarks(plugins)
  };
  props.plugins = createPlugins(plugins);
  props.onKeyDown = (e, data, state) => {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === "z" || data.key === "y")) {
      return state;
    }

    if (data.isShift && data.key === "enter") {
      return state
        .transform()
        .insertText("\n")
        .apply();
    }

    for (let i = 0; i < plugins.length; i++) {
      const { onKeyDown } = plugins[i];
      const newState = onKeyDown && onKeyDown(e, data, state);

      if (newState) {
        return newState;
      }
    }

    return;
  };

  const HoverButtons = ({ editorState, onChange, focus }) => (
    <div>
      {plugins.map((plugin, i) =>
        plugin.hoverButtons.map((Button, j) => (
          <Button
            key={`${i}-${j}`}
            editorState={editorState}
            onChange={onChange}
            focus={focus}
          />
        ))
      )}
    </div>
  );
  props.HoverButtons = HoverButtons;

  const ToolbarButtons = ({ editorState, onChange, focus }) => (
    <div>
      {plugins.map((plugin, i) =>
        plugin.toolbarButtons.map((Button, j) => (
          <Button
            key={`${i}-${j}`}
            editorState={editorState}
            onChange={onChange}
            focus={focus}
          />
        ))
      )}
    </div>
  );
  props.ToolbarButtons = ToolbarButtons;

  const Slate = cellProps => <Component {...cellProps} {...props} />;
  const StaticComponent = ({ state: { editorState } = {} }) => (
    <div dangerouslySetInnerHTML={{ __html: html.serialize(editorState) }} />
  );
  return {
    Component: Slate,
    StaticComponent,

    name: "ory-editor-plugins/slate",
    version: "0.0.1",
    IconComponent: <Subject />,
    text: "Текст",
    description: "Область с текстом.",

    allowInlineNeighbours: true,

    handleFocus: (props, source) => {
      if (source === "onMouseDown") {
        return;
      } else if (props.state.editorState.isFocused) {
        return;
      }

      setTimeout(() => {
        props.onChange({
          editorState: props.state.editorState
            .transform()
            .focus()
            .apply()
        });
      }, 0);
    },

    handleBlur: props => {
      if (!props.state.editorState.isFocused) {
        return;
      }

      props.onChange({
        editorState: props.state.editorState
          .transform()
          .blur()
          .apply()
      });
    },

    reducer: (state, action) => {
      if (
        (action.type === ActionTypes.UNDO ||
          action.type === ActionTypes.REDO) &&
        pathOr(false, ["content", "state", "editorState"], state)
      ) {
        return {
          ...state,
          content: {
            ...state.content,
            state: {
              ...state.content.state,
              editorState: state.content.state.editorState.merge({
                isNative: false
              })
            }
          }
        };
      }
      return state;
    },

    handleRemoveHotKey: hooks.handleRemoveHotKey,
    handleFocusPreviousHotKey: hooks.handleFocusPreviousHotKey,
    handleFocusNextHotKey: hooks.handleFocusNextHotKey,

    createInitialState: hooks.createInitialState,
    serialize: hooks.serialize,
    unserialize: hooks.unserialize

    // TODO this is disabled because of #207
    // merge = hooks.merge
    // split = hooks.split
  };
};
