import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ChromePicker } from "react-color";

class Component extends React.Component {
  state = {
    displayColorPicker: false
  };
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = color => {
    this.setState({ displayColorPicker: false });
  };
  render() {
    const { color, onChange, label } = this.props;
    const { displayColorPicker } = this.state;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "5px"
        }}
      >
        <TextField
          placeholder="white"
          label={label}
          style={{ flex: "1", marginRight: "10px" }}
          value={color}
          onChange={event => onChange(event.target.value)}
        />
        <Button variant="raised" color="default" onClick={this.handleClick}>
          Выбрать ...
        </Button>
        {displayColorPicker ? (
          <div
            style={{
              position: "absolute",
              zIndex: "2",
              right: "25px",
              bottom: "25px"
            }}
          >
            <div
              style={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px"
              }}
              onClick={this.handleClose}
            />
            <ChromePicker
              color={color}
              onChange={color => onChange(color.hex)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Component;
