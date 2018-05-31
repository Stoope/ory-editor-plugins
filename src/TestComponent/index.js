import React from "react";
import BottomToolbar from "../BottomToolbar";
import View from "./View";

const changeUrl = onChange => (event, newValue) => onChange({ url: newValue });

const HTML5Video = ({ readOnly, onChange, state, focused }) => (
  <div className="ory-content-plugin-html5-video">
    {!readOnly ? (
      <BottomToolbar open={focused}>
        {/* <TextField
          hintText="https://example.com/video.webm"
          floatingLabelText="Video url"
          onChange={changeUrl(onChange)}
          inputStyle={{ color: "white" }}
          floatingLabelStyle={{ color: "white" }}
          hintStyle={{ color: "grey" }}
          value={url}
        /> */}
        <div>tip contetn</div>
      </BottomToolbar>
    ) : null}
    <View state={state} />
  </div>
);

export default HTML5Video;
