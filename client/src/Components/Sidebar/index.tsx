import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Sidebar = (props: Props) => {
  const userRole =
    JSON.parse(window.localStorage.getItem("user") || "{}")?.role;
  const sidebarMenuList = [
    { title: "Home", path: "/", isVisible: true },
    { title: "My workspaces", path: "/workspace", isVisible: userRole !== 'employee' },
    { title: "Employees", path: "/employees", isVisible: userRole !== "employee" },
    { title: "Profile", path: "/my-profile", isVisible: userRole !== 'workspace_admin' },
  ];
  return (
    <div className="h-[calc(100vh_-_60px)] flex flex-col gap-4 p-6 items-start bg-gray-800 text-white min-w-[250px]">
      {sidebarMenuList?.map(
        (item) =>
          item?.isVisible && (
            <div>
              <Link to={item.path}>{item.title}</Link>
            </div>
          )
      )}
    </div>
  );
};

export default Sidebar;
