import React from "react";

export default function (props) {

  const style= {background: props.value !== 0 ? "wheat" : "rgba(103, 104, 93, 0.377)"}
  return (
    <div className="square-main-container">
      {/* {props.value} */}
      <div className="individual-grid" style={style}>
      {props.value ? props.value:""}
      </div>
    </div>
  );
}
