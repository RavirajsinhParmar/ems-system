import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import MainTemplate from "../../MainTemplate/MainTemplate";
import { useSignupMutation, useUpdateProfileMutation } from "../../Service/Auth";
import ProfileForm from "./ProfileForm";

type initValues = {
  name?: string;
  company?: string;
  phone?: string;
  dob?: Date | null;
  department?: string;
  profilePicture?: string;
  email?: string;
  password?: string;
};

const Profile = ({
  handleToggleEmployees,
  selectedEmployee,
  addEmployee,
}: any) => {
  const [updateProfile] = useUpdateProfileMutation();
  const [CreateEmployee] =useSignupMutation();
  const navigate = useNavigate();
  const isEmployeesPage = selectedEmployee?._id;
  const {
    name,
    email,
    phone,
    department,
    dob,
    company,
    profilePicture,
    _id,
    role,
  } = JSON.parse(window.localStorage.getItem("user") || "{}");
  const initialValues: initValues =
    isEmployeesPage || addEmployee
      ? {
          name: selectedEmployee?.name || "",
          company: selectedEmployee?.company || _id || "",
          phone: selectedEmployee?.phone || "",
          dob: selectedEmployee?.dob || null,
          department: selectedEmployee?.department || "",
          profilePicture: selectedEmployee?.profilePicture || "",
          email: selectedEmployee?.email || "",
          password: "",
        }
      : {
          name: name || "",
          company: company || "",
          phone: phone || "",
          dob: dob || null,
          department: department || "",
          profilePicture: profilePicture || "",
          email: email || "",
        };
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    name: yup.string().required("Name is required"),
    company: yup.string().required("Company is required"),
    phone: yup.string().required("Contact is required"),
    dob: yup.date().required("Date of birth is required"),
    department: yup.string().required("department is required"),
  });

  const formSubmit = async (
    values: { [key: string]: any },
    { resetForm }: any
  ) => {
    try {
      if (!selectedEmployee?._id && (role === "super_admin" || role === 'workspace_admin')) {
        const res = await CreateEmployee({
          ...values,
          dob: new Date(values.dob),
        });
        if (res?.data?.status === 200) {
          window?.localStorage?.setItem("token", res?.data?.token);
          navigate("/employees");
          resetForm();
        }
      } else {
        const res = await updateProfile({
          ...values,
          phone: values.phone,
          dob: new Date(values.dob),
        });
        if (res?.data?.status === 200) {
          const {
            name,
            email,
            phone,
            department,
            dob,
            company,
            profilePicture,
          } = res?.data?.user;
          if (res.data.email === email) {
            window.localStorage.setItem(
              "user",
              JSON.stringify({
                name,
                email,
                phone,
                department,
                dob,
                company,
                profilePicture,
              })
            );
          }
          if (isEmployeesPage || addEmployee) {
            navigate('/');
            handleToggleEmployees();
          } else navigate("/");
        }
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isEmployeesPage || addEmployee ? (
    <div className="m-9">
      <ProfileForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        formSubmit={formSubmit}
        isEmployeesPage={isEmployeesPage || !addEmployee}
        addEmployee={addEmployee}
        handleToggleEmployees={handleToggleEmployees}
        role={role}
      />
    </div>
  ) : (
    <MainTemplate>
      <>
        <div className="m-9 p-6 rounded-lg bg-gray-400">
          <div className="text-3xl font-semibold">My profile</div>
        </div>
        <div className="m-9 p-6 flex justify-center">
          <ProfileForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            formSubmit={formSubmit}
            isEmployeesPage={isEmployeesPage}
            addEmployee={addEmployee}
            handleToggleEmployees={handleToggleEmployees}
            role={role}
          />
        </div>
      </>
    </MainTemplate>
  );
};

export default Profile;
