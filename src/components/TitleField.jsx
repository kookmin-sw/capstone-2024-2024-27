import React, { useState } from "react";

function TitleWithPlaceholder({ title }) {
  return (
    <div style={{ position: "relative" }}>
      <h2
        style={{
          fontSize: "20px",
        }}
        onInput={handleChange}
      >
        {value || placeholder}
      </h2>
    </div>
  );
}

export default TitleWithPlaceholder;
