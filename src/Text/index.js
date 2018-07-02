import React, { Fragment } from "react";
import plugin from "./View";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
// Add fonts to whitelist
var Font = Quill.import("formats/font");
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ["mirza", "roboto"];
Quill.register(Font, true);

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
                      ["bold", "italic", "underline", "strike"],
                      [
                        "blockquote",
                        "code-block",
                        "link",
                        "image",
                        "video",
                        "formula"
                      ],
                      [{ header: 1 }, { header: 2 }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ script: "sub" }, { script: "super" }],
                      [{ indent: "-1" }, { indent: "+1" }],
                      [{ direction: "rtl" }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ font: [] }],
                      [{ align: [] }]
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
