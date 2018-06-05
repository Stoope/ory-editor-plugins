import React, { Fragment } from "react";
import BottomToolbar from "../BottomToolbar";
import plugin from "./View";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Image extends React.Component {
  onChange = event => this.props.onChange({ url: event.target.value });
  handleChange = onChange => e => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const change = {};

      if (target.name === "target") {
        if (target.checked) {
          change.target = "_blank";
          change.rel = "noreferrer noopener";
        } else {
          change.target = null;
          change.rel = null;
        }
      } else {
        change[target.name] = target.value;
      }

      onChange(change);
      return;
    }
  };

  render() {
    const { readOnly, state, focused, onChange } = this.props;
    return (
      <Fragment>
        <plugin.Component {...this.props} />
        {!readOnly && (
          <BottomToolbar open={focused}>
            <TextField
              placeholder="http://example.com/image.png"
              label="Url изображения"
              name="src"
              value={state.src}
              onChange={this.handleChange(onChange)}
            />
            <br />
            <TextField
              placeholder="http://example.com"
              label="Url перехода по клику"
              name="href"
              value={state.href}
              onChange={this.handleChange(onChange)}
            />
            <br />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.target === "_blank"}
                  name="target"
                  onChange={this.handleChange(onChange)}
                />
              }
              label="Открывать в новом окне"
            />
          </BottomToolbar>
        )}
      </Fragment>
    );
  }
}

export default { ...plugin, Component: Image };