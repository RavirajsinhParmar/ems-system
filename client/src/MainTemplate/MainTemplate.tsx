import React from "react";
import ValidateAuth from "../Utils/ValidateAuth";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import { useGetNotificationsQuery } from "../Service/Notifications";

type Props = {
  children: JSX.Element;
};

const MainTemplate = (props: Props) => {
  const { children } = props;
  const { data } = useGetNotificationsQuery({});

  console.log(data, "notification");
  return (
    <ValidateAuth>
      <>
        <Header />
        <div className="relative flex h-[calc(100vh_-_60px)]">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </>
    </ValidateAuth>
  );
};

export default MainTemplate;
