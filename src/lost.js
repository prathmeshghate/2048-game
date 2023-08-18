import React from "react";

export default function Lost (prop) {
  return (
    <>
    <div className="black-background"></div>
    <div className="lost-container">
      You Lost!... Try Again
      <input
        className="try-again-button"
        type="button"
        value="Try Again"
        onClick={prop.clickChange}
      />
    </div>
    </>
  );
}
