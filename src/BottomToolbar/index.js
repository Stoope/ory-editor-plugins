import React from "react";
import {
  createMuiTheme,
  MuiThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import Snackbar from "@material-ui/core/Snackbar";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: "oep"
});

const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      light: "#3a7ad9",
      main: "#3a7ad9",
      dark: "#3a7ad9"
    }
  }
});
const childStyle = {
  marginTop: "15px",
  marginBottom: "15px",
  flexDirection: "column",
  display: "flex"
};

class BottomToolbar extends React.Component {
  state = { hidden: false };
  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({ hidden: false });
    }
  }
  closeToolbar = () => {
    this.setState(({ hidden }) => ({ hidden: !hidden }));
  };
  render() {
    const { children, open } = this.props;
    const { hidden } = this.state;
    const Icon = hidden ? KeyboardArrowUp : KeyboardArrowDown;
    return (
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
            <Icon
              onClick={this.closeToolbar}
              style={{
                cursor: "pointer",
                fill: "white",
                marginLeft: "auto",
                height: 30,
                width: 40,
                padding: 5,
                marginRight: -5,
                marginBottom: -5,
                marginTop: -5
              }}
            />

            <Collapse in={!hidden}>
              <MuiThemeProvider theme={theme}>
                {children && Array.isArray(children) ? (
                  children
                    .filter(item => item)
                    .map(item => <div style={childStyle}>{item}</div>)
                ) : (
                  <div style={childStyle}>{children}</div>
                )}
              </MuiThemeProvider>
            </Collapse>
          </div>
        </Snackbar>
      </JssProvider>
    );
  }
}

export default BottomToolbar;
