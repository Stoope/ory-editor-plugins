import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const BottomToolbar = ({ open = false, children }) => (
  <Snackbar open={open}>
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.87)",
        borderRadius: "4px 4px 0px",
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        padding: "12px 24px"
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </div>
  </Snackbar>
);

export default BottomToolbar;
