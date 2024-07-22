import React from "react";
import Card from "../../Common/Card";
import { Holiday, Leave, Project } from "../../Assets/Icons";
import MainTemplate from "../../MainTemplate/MainTemplate";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <MainTemplate>
      <div className="p-8">
        <div className="flex gap-8 w-full flex-wrap">
          <Card
            icon={<Project className="w-8 h-8" />}
            title={"Projects"}
            label={"4"}
          />
          <Card
            icon={<Leave className="w-8 h-8" />}
            title={"Leaves"}
            label={"10"}
          />
          <Card
            icon={<Project className="w-8 h-8" />}
            title={"Attendance"}
            label={"18"}
          />
          <Card
            icon={<Holiday className="w-8 h-8" />}
            title={"Holidays"}
            label={"2"}
          />
        </div>
      </div>
    </MainTemplate>
  );
};

export default Dashboard;
