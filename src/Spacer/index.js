import React, { Fragment } from "react";
import BottomToolbar from "../BottomToolbar";
import plugin from "./View";
import TextField from "@material-ui/core/TextField";
import { Resizable } from 'react-resizable'
import './index.css';

const compute = ({ height }) => ({
  height: height > 24 ? height : 24
})

class Component extends React.Component {
  state = {}

  onResize = (
    event,
    { size }
  ) => {
    const { onChange } = this.props
    const state = compute(size)
    onChange(state)
  }
  onChange = event => this.props.onChange({ height: parseInt(event.target.value) });

  render() {
    const { readOnly, isPreviewMode, focused, onChange } = this.props
    const height = this.props.state.height > 0 ? this.props.state.height : 1;
    return (
      <Fragment>
        {!readOnly ? (
      <div
        style={{ border: 'solid 1px', borderColor: 'rgba(0, 0, 0, 0.12)' }}
        className='ory-plugins-content-spacer'
      >
          <Resizable onResize={this.onResize} height={height} width={0}>
            <div style={{ height, position: 'relative' }}>
          <BottomToolbar open={focused}>
            <TextField
              placeholder="24"
              label="Высота (px)"
              value={height}
              onChange={this.onChange}
            />
          </BottomToolbar>
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  height: '24px',
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.12)',
                  textAlign: 'center'
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ color: 'white', width: 24, height: 24 }}
                >
                  <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
                </svg>
              </div>
            </div>
          </Resizable>
      </div>
        ) : 
        <plugin.Component {...this.props} />}
      </Fragment>
    );
  }
}

export default { ...plugin, Component };
