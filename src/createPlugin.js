const rejectPromise = (e, props) => Promise.reject();

const createPlugin = props => ({
  version: "0.0.1",
  handleFocusNextHotKey: rejectPromise,
  handleFocusPreviousHotKey: rejectPromise,
  ...props
});

export default createPlugin;
