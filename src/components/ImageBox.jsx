import React from "react";

function ImageBox({ image }) {
  return (
    <div style={{ padding: "20px 0" }}>
      <img
        src={image}
        alt="ImageBox"
        style={{ maxWidth: "400px", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default ImageBox;
