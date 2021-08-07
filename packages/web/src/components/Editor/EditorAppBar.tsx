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
import { logoutRequest } from "../../api/requests";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetAuth, setAuth } from "../../redux/slices/authSlice";

export const EditorAppBar: React.FC = () => {
  const authToken = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleProfileClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    if (authToken) await logoutRequest(authToken);
    dispatch(resetAuth());
  };

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
          <MenuItem
            onClick={async () => {
              await handleLogout();
              handleProfileClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
