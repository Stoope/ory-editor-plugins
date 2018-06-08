import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});
const childStyle = {
  marginTop: "15px",
  marginBottom: "15px",
  flexDirection: "column",
  display: "flex"
};

const BottomToolbar = ({ open = false, children }) => (
  <Snackbar open={open}>
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.87)",
        borderRadius: "4px 4px 0px",
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        padding: "12px 24px",
        minWidth: "600px",
        flexDirection: "column",
        display: "flex"
      }}
    >
      <MuiThemeProvider theme={theme}>
        {children && Array.isArray(children) ? (
          children.map(item => <div style={childStyle}>{item}</div>)
        ) : (
          <div style={childStyle}>{children}</div>
        )}
      </MuiThemeProvider>
    </div>
  </Snackbar>
);

export default BottomToolbar;
