import React, { Fragment } from "react";
import BottomToolbar from "../BottomToolbar";
import UploadFile from "../UploadFile";
import plugin from "./View";
import TextField from "@material-ui/core/TextField";
import "./index.css";
import ColorPicker from "../ColorPicker";

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
    const {
      state: { text, url, borderRadius, bgColor, textColor },
      focused,
      onChange
    } = this.props;
    return (
      <Fragment>
        <plugin.Component {...this.props} />
        <BottomToolbar open={focused}>
          <TextField
            placeholder="Введите текст..."
            label="Текст"
            value={text}
            onChange={event => onChange({ text: event.target.value })}
          />
          <TextField
            placeholder="http://example.com"
            label="Url перехода по клику"
            value={url}
            onChange={event => onChange({ url: event.target.value })}
          />
          <TextField
            placeholder="5px"
            label="Скругление краев"
            value={borderRadius}
            onChange={event => onChange({ borderRadius: event.target.value })}
          />
          <div style={{ display: "flex" }}>
            <ColorPicker
              onChange={color => onChange({ bgColor: color })}
              color={bgColor}
              label="Цвет кнопки"
            />
            <ColorPicker
              onChange={color => onChange({ textColor: color })}
              color={textColor}
              label="Цвет текста"
            />
          </div>
        </BottomToolbar>
      </Fragment>
    );
  }
}

export default { ...plugin, Component: Image };
