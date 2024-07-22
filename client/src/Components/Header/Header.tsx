import React, { useState } from "react";
import { Popover } from "@mui/material";
import { Logout, Profile } from "../../Assets/Icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { profilePicture } = JSON.parse(
    window.localStorage.getItem("user") || "{}"
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: { [key: string]: any }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window?.localStorage?.removeItem("token");
    window?.localStorage?.removeItem("user");
    handleClose();
    navigate("/login");
  };

  return (
    <div className="h-[60px] flex gap-4 justify-end items-center px-4 text-white bg-white dark:bg-gray-900 sticky w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="rounded-full cursor-pointer border border-gray-400">
        {profilePicture ? (
          <img
            width={8}
            height={8}
            className="w-8 h-8 object-cover rounded-full"
            src={profilePicture}
            alt="profile"
          />
        ) : (
          <Profile
            aria-describedby={id}
            onClick={handleClick}
            className="w-8 h-8 p-1 cursor-pointer"
          />
        )}
      </div>
      <Logout className="w-8 h-8 cursor-pointer" onClick={handleLogout} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          className="p-2 cursor-pointer"
          onClick={() => navigate("/my-profile")}
        >
          My Profile
        </div>
      </Popover>
    </div>
  );
};

export default Header;
