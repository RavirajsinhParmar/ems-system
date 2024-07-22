import React, { useState } from "react";
import MainTemplate from "../../MainTemplate/MainTemplate";
import WorkspaceList from "./WorkspaceList";
import {
  useDeleteWorkspaceMutation,
  useGetWorkspacesQuery,
} from "../../Service/Workspace";
import CreateWorkspace from "./CreateWorkspace";

type Props = {};

const Workspace = (props: Props) => {
  const values = JSON.parse(window.localStorage.getItem("user") || "{}");
  const [selectedWorkspace, setSelectedWorkspace] = useState<{
    [key: string]: any;
  }>({});
  const [addWorkspace, setAddWorkspace] = useState(
    values?.role === "workspace_admin" || false
  );
  const [deleteWorkspace] = useDeleteWorkspaceMutation();
  const { data } = useGetWorkspacesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const handleToggleWorkspace = () => setAddWorkspace(!addWorkspace);

  const editWorkspace = (id: string) => {
    handleToggleWorkspace();
    setSelectedWorkspace(
      data?.data?.find((item: { [key: string]: any }) => item?._id === id)
    );
  };

  const handleDeleteWorkspace = async (id: string) => {
    await deleteWorkspace(id);
  };
  return (
    <MainTemplate>
      <div className="p-9">
        <div className="flex justify-between">
          <p className="text-3xl font-semibold">
            {addWorkspace
              ? `${
                  values?.role === "workspace_admin" || selectedWorkspace?._id
                    ? "Update"
                    : "Create New"
                } Workspace`
              : "Workspaces"}
          </p>
          {!addWorkspace && values?._id && (
            <button
              className="px-3 py-2 text-white bg-blue-500 rounded-lg text-base font-medium"
              onClick={handleToggleWorkspace}
            >
              + Add
            </button>
          )}
        </div>
        {addWorkspace || values?.role === "workspace_admin" ? (
          <CreateWorkspace
            handleToggleWorkspace={handleToggleWorkspace}
            initValues={
              values?.role === "workspace_admin" ? values : selectedWorkspace
            }
          />
        ) : (
          <WorkspaceList
            data={data?.data}
            deleteWorkspace={handleDeleteWorkspace}
            editWorkspace={editWorkspace}
          />
        )}
      </div>
    </MainTemplate>
  );
};

export default Workspace;
