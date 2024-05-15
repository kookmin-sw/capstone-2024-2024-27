import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

function MyListBox({ items = [] }) {
  const itemList = Array.isArray(items) ? items : [];

  return (
    <Paper elevation={2}>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.primary} secondary={item.secondary} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default MyListBox;
