import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

const containerStyle = {
  backgroundColor: "white"
};

const anchorOrigin = { vertical: "bottom", horizontal: "center" };

const BottomToolbar = ({ open = false, children, className }) => (
  <Snackbar
    anchorOrigin={anchorOrigin}
    open={open}
    message={<div style={containerStyle}>{children}</div>}
  />
);

export default BottomToolbar;
