import React, { Fragment } from "react";
import BottomToolbar from "../BottomToolbar";
import { v4 } from "uuid";
import plugin from "./View";
import TextField from "@material-ui/core/TextField";
import UploadFile from "../UploadFile";
import { ContentPlugin } from "ory-editor-core/lib/service/plugin/classes";
import Text from "../Text";

class Component extends React.Component {
  render() {
    const {
      state: { background = "", darken = 0.3 },
      focused,
      onChange,
      children
    } = this.props;

    return (
      <Fragment>
        <plugin.Component {...this.props}>
          <BottomToolbar open={focused}>
            <div style={{ display: "flex" }}>
              <TextField
                placeholder="http://example.com/image.png"
                label="Url изображения"
                style={{ flex: "1" }}
                value={background || ""}
                onChange={event => onChange({ background: event.target.value })}
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
