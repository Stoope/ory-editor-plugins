/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Portal } from "react-portal";
import position from "selection-position";
import { Editor } from "slate";
import BottomToolbar from "../../BottomToolbar";

import { html as serializer } from "../hooks.js";

const onBlur = (_event, _data, state) => state;

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class Slate extends Component {
  componentDidMount = () => {
    this.selection = window.getSelection();
    this.updateToolbar();
  };

  shouldComponentUpdate = nextProps =>
    nextProps.state.editorState !== this.props.state.editorState ||
    nextProps.state.toolbar !== this.props.state.toolbar ||
    nextProps.focused !== this.props.focused ||
    nextProps.readOnly !== this.props.readOnly;

  componentDidUpdate = () => this.updateToolbar();

  props;
  portal;

  onStateChange = editorState => {
    this.props.onChange({ editorState });
  };

  handleOpen = portal => {
    this.toolbar = portal.firstChild;
  };

  updateToolbar = () => {
    const { editorState } = this.props.state;
    const toolbar = this.toolbar;

    if (!toolbar || editorState.isBlurred || editorState.isCollapsed) {
      return;
    }

    const { left, top, width } = position();

    toolbar.style.opacity = 1;
    toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`;
    toolbar.style.left = `${left +
      window.scrollX -
      toolbar.offsetWidth / 2 +
      width / 2}px`;
  };

  onPaste = (e, data, state) => {
    if (data.type !== "html") return;
    if (data.isShift) return;

    const { document } = serializer.deserialize(data.html);

    return state
      .transform()
      .insertFragment(document)
      .apply();
  };

  render() {
    const {
      focused,
      readOnly,
      state: { editorState },
      schema,
      plugins,
      onKeyDown,
      HoverButtons,
      ToolbarButtons,
      focus
    } = this.props;
    const isOpened = editorState.isExpanded && editorState.isFocused;

    return (
      <div>
        <Portal isOpened={isOpened} onOpen={this.handleOpen}>
          <MuiThemeProvider theme={theme}>
            {/* ory-prevent-blur is required to prevent global blurring */}
            <div
              className="ory-prevent-blur ory-plugins-content-slate-inline-toolbar"
              style={{ padding: 0 }}
            >
              <HoverButtons
                editorState={editorState}
                onChange={this.onStateChange}
                focus={focus}
              />
            </div>
          </MuiThemeProvider>
        </Portal>
        <Editor
          onChange={this.onStateChange}
          onKeyDown={onKeyDown}
          readOnly={Boolean(readOnly)}
          onBlur={onBlur}
          schema={schema}
          state={editorState}
          plugins={plugins}
          onPaste={this.onPaste}
        />
        {readOnly ? null : (
          <BottomToolbar open={focused}>
            <ToolbarButtons
              editorState={editorState}
              onChange={this.onStateChange}
              focus={focus}
            />
          </BottomToolbar>
        )}
      </div>
    );
  }
}

export default Slate;
