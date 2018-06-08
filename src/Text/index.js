import React, { Fragment } from "react";
import plugin from "./View";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Text extends React.Component {
  onChange = value => this.props.onChange({ html: value });

  render() {
    const { readOnly, state, focused } = this.props;
    return (
      <Fragment>
        {!readOnly ? (
          <Fragment>
            <ReactQuill
              modules={{
                toolbar: focused
                  ? [
                      ["bold", "italic", "underline", "strike"], // toggled buttons
                      ["blockquote", "code-block"],

                      [{ header: 1 }, { header: 2 }], // custom button values
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ script: "sub" }, { script: "super" }], // superscript/subscript
                      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                      [{ direction: "rtl" }], // text direction

                      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],

                      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                      [{ font: [] }],
                      [{ align: [] }],

                      ["clean"] // remove formatting button
                    ]
                  : null
              }}
              value={state.html || ""}
              onChange={this.onChange}
              placeholder="Введите текст..."
            />
          </Fragment>
        ) : (
          <plugin.Component {...this.props} />
        )}
      </Fragment>
    );
  }
}

export default { ...plugin, Component: Text };
