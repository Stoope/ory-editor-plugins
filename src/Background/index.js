import React, { Fragment } from "react";
import BottomToolbar from "../BottomToolbar";
import { v4 } from "uuid";
import plugin from "./View";
import TextField from "@material-ui/core/TextField";
import UploadFile from "../UploadFile";
import { ContentPlugin } from "ory-editor-core/lib/service/plugin/classes";
import Text from "../Text";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import ColorPicker from "../ColorPicker";

class Component extends React.Component {
  render() {
    const {
      state: { background, darken, type, color },
      focused,
      onChange,
      children
    } = this.props;
    return (
      <Fragment>
        <plugin.Component {...this.props}>
          <BottomToolbar open={focused}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Тип фона</FormLabel>
              <RadioGroup
                aria-label="Тип фона"
                name="type"
                value={type}
                onChange={event => onChange({ type: event.target.value })}
              >
                <FormControlLabel
                  value="image"
                  control={<Radio />}
                  label="Изображение"
                />
                <FormControlLabel
                  value="color"
                  control={<Radio />}
                  label="Цвет"
                />
              </RadioGroup>
            </FormControl>
            {type === "image" && (
              <Fragment>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <TextField
                    placeholder="http://example.com/image.png"
                    label="Url изображения"
                    style={{ flex: "1", marginRight: "10px" }}
                    value={background || ""}
                    onChange={event =>
                      onChange({ background: event.target.value })
                    }
                  />
                  <UploadFile
                    onSuccess={file =>
                      file[0] && onChange({ background: file[0].url })
                    }
                  />
                </div>
                <TextField
                  placeholder="0.3"
                  label="Затемнение"
                  value={darken || 0.3}
                  onChange={event => onChange({ darken: event.target.value })}
                />
              </Fragment>
            )}
            {type === "color" && (
              <ColorPicker
                onChange={color => onChange({ color })}
                color={color}
                label="Цвет"
              />
            )}
          </BottomToolbar>
          {children}
        </plugin.Component>
      </Fragment>
    );
  }
}

export default {
  ...plugin,
  Component,
  createInitialChildren: () => ({
    id: v4(),
    rows: [
      {
        id: v4(),
        cells: [
          {
            content: {
              plugin: new ContentPlugin(Text),
              state: {
                html: ""
              }
            },
            id: v4()
          }
        ]
      }
    ]
  })
};
