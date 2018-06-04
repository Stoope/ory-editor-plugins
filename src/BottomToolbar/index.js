import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const BottomToolbar = ({ open = false, children }) => (
  <Snackbar
    open={open}
    message={
      <div>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </div>
    }
  />
);

export default BottomToolbar;
