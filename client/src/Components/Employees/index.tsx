import React, { useEffect, useState } from "react";
import MainTemplate from "../../MainTemplate/MainTemplate";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesMutation,
  useUpdateEmployeeMutation,
} from "../../Service/Employees";
import EmployeesList from "./EmployeesList";
import Profile from "../MyProfile";

type Props = {};

const Employees = (props: Props) => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [data, setEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState<
    { [key: string]: any } | undefined
  >({});
  const userWorkspace: { [key: string]: any } = JSON.parse(
    window.localStorage.getItem("user") || "{}"
  );
  const [getEmployeesData] = useGetEmployeesMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [updateProfile] = useUpdateEmployeeMutation();
  const handleToggleEmployees = () => {
    setAddEmployee(!addEmployee);
    setSelectedEmployee([]);
  };

  const getEmployees = async () => {
    const res =
      userWorkspace?.role === "workspace_admin"
        ? await getEmployeesData({
            isWorkspace: true,
            company: userWorkspace?._id,
          })
        : await getEmployeesData({ isWorkspace: userWorkspace?.isWorkspace });
    setEmployeesList(res?.data?.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const editEmployee = (id: string) => {
    setAddEmployee(true);
    setSelectedEmployee(
      data?.find((item: { [key: string]: any }) => item?._id === id)
    );
  };

  const updateEmployeeActiveStatus = async (values: { [key: string]: any }) => {
    const res = await updateProfile({
      ...values,
    });
    if (res?.data?.status === 200) {
      getEmployees();
    }
  };
  const handleDeleteEmployee = async (id: string) => {
    await deleteEmployee(id);
  };
  return (
    <MainTemplate>
      <div className="p-9">
        <div className="flex justify-between">
          <p className="text-3xl font-semibold">
            {addEmployee && !selectedEmployee?._id
              ? "Create New Employee"
              : selectedEmployee?._id
              ? "Update Employee Info"
              : "Employees"}
          </p>
          {!addEmployee && (
            <button
              className="px-3 py-2 text-white bg-blue-500 rounded-lg text-base font-medium"
              onClick={handleToggleEmployees}
            >
              + Add
            </button>
          )}
        </div>
        {addEmployee ? (
          <Profile
            handleToggleEmployees={handleToggleEmployees}
            selectedEmployee={selectedEmployee}
            addEmployee={addEmployee}
          />
        ) : (
          <EmployeesList
            data={data}
            editEmployee={editEmployee}
            deleteEmployee={handleDeleteEmployee}
            updateEmployeeActiveStatus={updateEmployeeActiveStatus}
          />
        )}
      </div>
    </MainTemplate>
  );
};

export default Employees;
