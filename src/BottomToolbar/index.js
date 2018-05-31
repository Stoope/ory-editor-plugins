import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

const anchorOrigin = { vertical: "bottom", horizontal: "center" };
const BottomToolbar = ({ open = false, children, className }) => (
  <Snackbar
    anchorOrigin={anchorOrigin}
    open={open}
    message={
      <div
        style={{
          display: "inline-block",
          border: `${darkBlack} 1px solid`,
          borderRadius: "4px 4px 0",
          backgroundColor: "black",
          padding: "12px 24px"
        }}
      >
        {children}
      </div>
    }
  />
);

export default BottomToolbar;
