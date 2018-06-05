import React from "react";
import createPlugin from "../createPlugin";

const Panorama = ({style}) => <svg style={style} fill="rgb(255, 255, 255)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path d="M0 0h24v24H0z" fill="none"/>
<path d="M23 18V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z"/>
</svg>;


const View = ({ state }) => {
  const Image = (
    <img
      style={{
        width: "100%"
      }}
      src={state.src}
    />
  );
  return state.src ? (
    <div>
      {state.href ? (
        <a href={state.href} target={state.target} rel={state.rel}>
          {Image}
        </a>
      ) : (
        Image
      )}
    </div>
  ) : (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          textAlign: "center"
        }}
      >
        <Panorama
          style={{
            width: "100%",
            height: "auto",
            padding: "0",
            fill: "rgb(170, 170, 170)",
            textAlign: "center",
            minWidth: 64,
            minHeight: 64,
            maxHeight: 256
          }}
        />
      </div>
    </div>
  );
};

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/image",
  text: "Изображение",
  description: "Отображение изображения по url",
  IconComponent: <Panorama />,
  handleFocus: (props, source, ref) => {
    if (!ref) {
      return;
    }
    setTimeout(() => ref.focus());
  }
});
