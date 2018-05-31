import React from "react";
import BottomToolbar from "../BottomToolbar";
import View from "./View";
import TextField from "@material-ui/core/TextField";

class HTML5Video extends React.Component {
  onChange = event => this.props.onChange({ url: event.target.value });

  render() {
    const { readOnly, state, focused } = this.props;
    return (
      <div>
        {!readOnly ? (
          <BottomToolbar open={focused}>
            <TextField
              label="Video url"
              value={state.url || ""}
              onChange={this.onChange}
            />
          </BottomToolbar>
        ) : null}
        <View state={state} />
      </div>
    );
  }
}

export default HTML5Video;
