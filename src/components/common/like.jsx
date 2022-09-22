import React, { Component } from "react";

function Like(props) {
  let classes = "fa fa-heart";
  if (props.liked !== true) classes += "-o";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={props.onLikeClicked}
    />
  );
}

export default Like;
