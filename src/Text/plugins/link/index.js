/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */
import LinkIcon from "@material-ui/icons/Link";
import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ToolbarButton } from "../../helpers";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Plugin from "../Plugin";
import Link from "./node";
import Dialog from "@material-ui/core/Dialog";
import FlatButton from "@material-ui/core/Button";
import { Data } from "slate";
import DialogActions from "@material-ui/core/DialogActions";

export const A = "LINK/LINK";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class Button extends Component {
  state = {
    open: false,
    href: "",
    title: "",
    hadLinks: false
  };

  props;

  input;

  onRef = component => {
    if (!component && true) {
      return null;
    }

    const e = component.querySelector("input");
    if (e) {
      e.focus();
    }
  };

  onClick = e => {
    const { editorState, onChange } = this.props;
    e.preventDefault();

    const hasLinks = editorState.inlines.some(inline => inline.type === A);

    if (hasLinks) {
      const newState = editorState
        .transform()
        .unwrapInline(A)
        .apply();
      onChange(newState);
    } else if (editorState.isExpanded) {
      this.setState({
        open: true,
        wasExpanded: editorState.isExpanded,
        href: "",
        title: "",
        hadLinks: hasLinks
      });
    } else {
      this.setState({
        open: true,
        wasExpanded: editorState.isExpanded,
        href: "",
        title: "",
        hadLinks: hasLinks
      });
    }
  };

  handleClose = () => {
    this.setState({ open: false });

    const newState = this.props.editorState
      .transform()
      .focus()
      .apply();
    window.setTimeout(() => this.props.onChange(newState), 1);
  };

  handleSubmit = () => {
    this.setState({ open: false });

    if (!this.state.href) {
      this.handleClose();
      return;
    }

    if (this.state.wasExpanded) {
      const newState = this.props.editorState
        .transform()
        .focus()
        .apply()
        .transform()
        .wrapInline({
          type: A,
          data: { href: this.state.href }
        })
        .collapseToEnd()
        .apply();

      window.setTimeout(() => this.props.onChange(newState), 1);
      window.setTimeout(() => this.props.focus(), 100);
      return;
    }

    if (!this.state.title) {
      this.handleClose();
      return;
    }

    const newState = this.props.editorState
      .transform()
      .insertText(this.state.title)
      .extend(-this.state.title.length)
      .wrapInline({
        type: A,
        data: { href: this.state.href }
      })
      .collapseToEnd()
      .focus()
      .apply();

    this.props.onChange(newState);
    window.setTimeout(() => this.props.focus(), 100);
  };

  onHrefChange = e => {
    this.setState({ href: e.target.value });
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    const { editorState } = this.props;

    const hasLinks = editorState.inlines.some(inline => inline.type === A);
    return (
      <MuiThemeProvider theme={theme}>
        <span>
          <ToolbarButton
            onClick={this.onClick}
            isActive={hasLinks}
            icon={<LinkIcon />}
          />
          <span>
            <Dialog
              aria-labelledby="alert-dialog-title"
              className="ory-prevent-blur"
              open={this.state.open}
            >
              <DialogTitle id="alert-dialog-title">Создать ссылку</DialogTitle>
              <DialogContent>
                {this.state.wasExpanded ? null : (
                  <div>
                    <TextField
                      label="Заголовок"
                      onChange={this.onTitleChange}
                      value={this.state.title}
                    />
                  </div>
                )}
                <div ref={this.onRef}>
                  <TextField
                    label="http://example.com/"
                    onChange={this.onHrefChange}
                    value={this.state.href}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <FlatButton key="0" color="primary" onClick={this.handleClose}>
                  Отменить
                </FlatButton>,
                <FlatButton key="1" color="primary" onClick={this.handleSubmit}>
                  Отправить
                </FlatButton>
              </DialogActions>
            </Dialog>
          </span>
        </span>
      </MuiThemeProvider>
    );
  }
}

export default class LinkPlugin extends Plugin {
  name = "link";

  nodes = { [A]: Link };

  hoverButtons = [Button];
  toolbarButtons = [Button];

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case "a":
        return {
          kind: "inline",
          type: A,
          nodes: next(el.childNodes),
          data: Data.create({
            href: (
              el.attrs.find(({ name }) => name === "href") || {
                value: ""
              }
            ).value
          })
        };
    }
  };

  serialize = (object, children) => {
    if (object.kind !== "inline") {
      return;
    }
    switch (object.type) {
      case A:
        return <a href={object.data.get("href")}>{children}</a>;
    }
  };
}
