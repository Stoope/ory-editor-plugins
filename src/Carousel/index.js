import React, { Fragment } from "react";
import BottomToolbar from "../BottomToolbar";
import UploadFile from "../UploadFile";
import plugin from "./View";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Component extends React.Component {
  render() {
    const { readOnly, state, focused, onChange } = this.props;
    return (
      <Fragment>
        <plugin.Component {...this.props} />
        {!readOnly && (
          <BottomToolbar open={focused}>
            <div style={{ display: "flex" }}>
              <UploadFile
                text="Выберите изображения..."
                multiple
                onSuccess={file => {
                  onChange({
                    images: file.map(item => ({ ...item, src: item.url }))
                  });
                }}
              />
            </div>
            <TextField
              placeholder="2"
              label="Количество изображений в строке"
              value={state.cols}
              onChange={event =>
                this.props.onChange({ cols: event.target.value })
              }
            />
            <TextField
              placeholder="100"
              label="Высота превью(px)"
              value={state.previewHeight}
              onChange={event =>
                this.props.onChange({ previewHeight: event.target.value })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.lightbox}
                  name="lightbox"
                  onChange={event =>
                    this.props.onChange({ lightbox: event.target.checked })
                  }
                />
              }
              label="Открывать в всплывающем окне"
            />
          </BottomToolbar>
        )}
      </Fragment>
    );
  }
}

export default { ...plugin, Component };
