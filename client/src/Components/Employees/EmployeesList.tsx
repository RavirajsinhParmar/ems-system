import React from "react";
import CommonTable from "../../Common/Table";
import { Delete, Edit } from "../../Assets/Icons";
import { EmpoloyeeColumns } from "./TableValues";
import { useGetWorkspacesQuery } from "../../Service/Workspace";
import { Switch } from "@mui/material";

type Props = {
  data: Object[];
  editEmployee: any;
  deleteEmployee: any;
  updateEmployeeActiveStatus: any;
};

const EmployeesList = (props: Props) => {
  const { data, editEmployee, deleteEmployee, updateEmployeeActiveStatus } = props;
  const { data: workspaceData } = useGetWorkspacesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  console.log(data, 'data')
  const createData = (data: { [key: string]: any }, columnKey: string) => {
    const value = data[columnKey];
    const workspace = workspaceData?.data?.find(
      (item: { [key: string]: any }) => item?._id === data?.company
    );
    switch (columnKey) {
      case "company":
        return workspace?.name;
      case "actions":
        return (
          <div className="flex gap-2">
            <Edit
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                editEmployee(data?._id);
              }}
            />
            <Delete
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                deleteEmployee(data?._id);
              }}
            />
            <Switch
              defaultChecked={data?.isActive}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateEmployeeActiveStatus({
                  ...data,
                  isActive: e.target.checked,
                  isWorkspace: workspace?.role === 'workspace_admin'
                });
              }}
            />
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <div className="my-4">
      <CommonTable
        columns={EmpoloyeeColumns}
        rows={data}
        createData={createData}
      />
    </div>
  );
};

export default EmployeesList;
