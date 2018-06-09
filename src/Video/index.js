import React from "react";
import BottomToolbar from "../BottomToolbar";
import plugin from "./View";
import TextField from "@material-ui/core/TextField";

class Image extends React.Component {
  onChange = event => this.props.onChange({ src: event.target.value });
  render() {
    const { readOnly, state, focused } = this.props;
    return (
      <div
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        {readOnly ? null : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10
            }}
          />
        )}
        <plugin.Component {...this.props} />
        {!readOnly && (
          <BottomToolbar open={focused}>
            <TextField
              placeholder="https://www.youtube.com/watch?v=ER97mPHhgtM"
              label="Url видео (YouTube / Vimeo, ...)"
              name="src"
              value={state.src || ""}
              onChange={this.onChange}
            />
          </BottomToolbar>
        )}
      </div>
    );
  }
}

export default { ...plugin, Component: Image };
