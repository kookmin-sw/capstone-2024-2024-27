import React from "react";

import TextField from "@material-ui/core/TextField";

function MyTextField({
  value = "",
  defaultValue = "",
  minRows = 5,
  isReadOnly = true,
  scrollable = false,
  onChange = {},
}) {
  return (
    <div>
      <TextField
        minRows={minRows}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder="(Empty)"
        inputProps={{
          readOnly: isReadOnly,
          overflow: scrollable ? "auto" : "hidden",
        }}
        style={{
          backgroundColor: isReadOnly ? "#f0f0f0" : "#ffffff",
          // border: "1px solid #ccc",
        }}
        variant="outlined"
        multiline
        fullWidth
      />
    </div>
  );
}

export default MyTextField;
