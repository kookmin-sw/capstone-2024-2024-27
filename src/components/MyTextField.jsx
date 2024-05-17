import React from "react";

import TextField from "@material-ui/core/TextField";
function emptyFunction() {}

function MyTextField({
  value = "",
  defaultValue = "",
  onChange = emptyFunction,
  placeholder = "(Empty)",
  minRows = 1,
  maxRows = 2,
  isReadOnly = true,
  fontSize = 20,
  backgroundColor = "",
  scrollable = false,
}) {
  const bgColor = backgroundColor || (isReadOnly ? "#f0f0f0" : "#ffffff");

  return (
    <div>
      <TextField
        minRows={minRows}
        maxRows={maxRows}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{
          readOnly: isReadOnly,
          overflow: scrollable ? "auto" : "hidden",
        }}
        style={{
          backgroundColor: bgColor,
          fontSize: { fontSize },
        }}
        variant="outlined"
        multiline
        fullWidth
      />
    </div>
  );
}

export default MyTextField;
