import React from "react";
import {
  createMuiTheme,
  MuiThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import Snackbar from "@material-ui/core/Snackbar";

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: "oep"
});

const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      light: '#3a7ad9',
      main: '#3a7ad9',
      dark: '#3a7ad9',
    },
  }
});
const childStyle = {
  marginTop: "15px",
  marginBottom: "15px",
  flexDirection: "column",
  display: "flex"
};

const BottomToolbar = ({ open = false, children }) => (
  <JssProvider generateClassName={generateClassName}>
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
            children
              .filter(item => item)
              .map(item => <div style={childStyle}>{item}</div>)
          ) : (
            <div style={childStyle}>{children}</div>
          )}
        </MuiThemeProvider>
      </div>
    </Snackbar>
  </JssProvider>
);

export default BottomToolbar;
