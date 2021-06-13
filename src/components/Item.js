import React from "react";

import "./Item.css";

export default function Item(props) {
  return (
    <div
      id={props.id}
      draggable="true"
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      className="item"
    >
      {props.children}
    </div>
  );
}
