import React from "react";

const View = ({ state: { url = "" } }) => (
  <video autoPlay controls loop muted width="100%">
    <source src={url} type={`video/${url.split(".").pop()}`} />
  </video>
);

export default View;
