import React from "react";
import { logoutRequest } from "../../api/requests";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetAuth } from "../../redux/slices/authSlice";
import IconButton from "../common/IconButton";
import { FaSignOutAlt } from "react-icons/fa";

export const EditorAppBar: React.FC = () => {
  const authToken = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    if (authToken) await logoutRequest(authToken);
    dispatch(resetAuth());
  };

  return (
    <div className="h-12 bg-green-500 px-8 flex items-center justify-between">
      <div className="text-3xl font-sans font-bold">Desmos Live</div>
      <IconButton onClick={handleLogout}>
        <FaSignOutAlt className="text-2xl" />
      </IconButton>
    </div>
  );
};
