import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircleTwoTone } from "@material-ui/icons";
import React from "react";
import { useState } from "react";

export const EditorAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleProfileClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => setAnchorEl(null);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
          Desmos Live
        </Typography>
        <IconButton
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleProfileClick}
        >
          <AccountCircleTwoTone />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
