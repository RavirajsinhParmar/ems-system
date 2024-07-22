import React from "react";
import CommonTable from "../../Common/Table";
import { Delete, Edit } from "../../Assets/Icons";

type Props = {
  data: Object[];
  editWorkspace: any;
  deleteWorkspace: any;
};

const WorkspaceList = (props: Props) => {
  const { data, editWorkspace, deleteWorkspace } = props;

  interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    {
      id: "phone",
      label: "Phone Number",
      minWidth: 170,
    },
    {
      id: "address",
      label: "Address",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 170,
    },
  ];
  const createData = (data: { [key: string]: any }, columnKey: string) => {
    const value = data[columnKey];
    // const workspace = workspaceData?.data?.find(
    //   (item: { [key: string]: any }) => item?._id === data?.company
    // );
    switch (columnKey) {
      case "actions":
        return (
          <div className="flex gap-2">
            <Edit
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                editWorkspace(data?._id);
              }}
            />
            <Delete
              className="w-6 h-6 cursor-pointer"
              onClick={() => deleteWorkspace(data?._id)}
            />
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <>
      <div className="my-4">
        <CommonTable columns={columns} rows={data} createData={createData} />
      </div>
    </>
  );
};

export default WorkspaceList;
