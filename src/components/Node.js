import React from "react";
import "./Node.css";

function Node(props) {
  return (
    <div
      className={`square ${props.className}`}
      id={props.id}
      onClick={props.onClick}
      onDrop={props.onDrop}
      onDragOver={props.onDragOver}
      draggable="true"
    >
      {props.children}
    </div>
  );
}

export default Node;
