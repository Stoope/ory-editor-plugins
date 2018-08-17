import React from "react";
import createPlugin from "../createPlugin";

const View = () => {
  return (
    <div>
      Для добавления новых элементов нажмите на кнопку "+" и перетащите элементы
    </div>
  );
};

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/default",
  text: null,
  description: null,
  IconComponent: null
});
