import React from "react";

const Code = ({ attributes, children }) => (
  <pre {...attributes} style={{ overflow: "scroll" }}>
    <code>{children}</code>
  </pre>
);

export default Code;
