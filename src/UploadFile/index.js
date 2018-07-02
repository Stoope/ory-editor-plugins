import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/FileUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

class Component extends React.Component {
  state = { loading: false };
  handleChange = event => {
    const filesList = [...event.target.files];
    if (filesList.length) {
      this.setState({ loading: true }, () => {
        Promise.all(
          filesList.map(item => {
            const body = new FormData();
            body.append("file", item);
            return fetch("http://cbsmba.betadev.org/api/v1/upload/file", {
              method: "POST",
              body
            }).then(response => response.json());
          })
        ).then(values => {
          this.setState({ loading: false }, () => this.props.onSuccess(values));
        });
      });
    }
  };
  render() {
    const { multiple = false, text = "Выбрать ..." } = this.props;
    const { loading } = this.state;
    return (
      <Fragment>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="flat-button-file"
          type="file"
          disabled={loading}
          onChange={this.handleChange}
          multiple={multiple}
        />
        <label htmlFor="flat-button-file">
          <Button
            component="span"
            variant="raised"
            color="default"
            disabled={loading}
          >
            {text}
            <FileUpload />
            {loading && (
              <CircularProgress
                size={24}
                style={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12
                }}
              />
            )}
          </Button>
        </label>
      </Fragment>
    );
  }
}

export default Component;
