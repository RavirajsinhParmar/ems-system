import { Form, Formik } from "formik";
import React from "react";
import UploadFile from "../../Common/FileUplaod";
import { Avatar } from "../../Assets/Icons";
import Input from "../../Common/Input";
import CommonSelect from "../../Common/Select";
import { SelectChangeEvent } from "@mui/material";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useGetWorkspacesQuery } from "../../Service/Workspace";

type Props = {};

type MyProfile = {
  initialValues: { [key: string]: any };
  validationSchema: Object;
  formSubmit: any;
  handleToggleEmployees: any;
  isEmployeesPage: boolean;
  addEmployee: boolean;
  role: string;
};

type formProps = {
  errors: { [key: string]: any };
  touched: { [key: string]: any };
  values: { [key: string]: any };
  setFieldValue: any;
  resetForm: any;
};

const ProfileForm = ({
  initialValues,
  validationSchema,
  formSubmit,
  isEmployeesPage,
  handleToggleEmployees,
  addEmployee,
  role,
}: MyProfile) => {
  const navigate = useNavigate();
  const { data } = useGetWorkspacesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={formSubmit}
    >
      {({ errors, touched, values, setFieldValue, resetForm }: formProps) => (
        <Form id="update-profile-form">
          <div className="flex flex-col gap-5 h-auto rounded-lg">
            <div className="flex flex-col gap-5 h-auto">
              <div className="flex items-center justify-center">
                <UploadFile
                  onDrop={(e: any) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(e[0]);
                    reader.onload = () => {
                      setFieldValue("profilePicture", reader.result);
                    };
                  }}
                >
                  <div className="rounded-full cursor-pointer border p-2 border-gray-400">
                    {values?.profilePicture ? (
                      <img
                        width={84}
                        height={84}
                        className="w-[84px] h-[84px] object-cover rounded-full"
                        src={values?.profilePicture}
                        alt="profile"
                      />
                    ) : (
                      <Avatar className="w-[84px] h-[84px]" />
                    )}
                  </div>
                </UploadFile>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Full name"
                  errors={errors}
                  touched={touched}
                  isRequired={true}
                  id="name"
                  name="name"
                  placeholder="john doe"
                />
                <CommonSelect
                  label="Company"
                  isRequired
                  touched={touched}
                  errors={errors}
                  id="company"
                  name="company"
                  isDisabled={role === "workspace_admin"}
                  placeholder={"Enter company name"}
                  options={data?.data}
                  handleChange={(e: SelectChangeEvent) =>
                    setFieldValue("company", e.target.value)
                  }
                  value={values?.company}
                />
                <Input
                  label="Contact Number"
                  errors={errors}
                  touched={touched}
                  isRequired={true}
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                />
                <Input
                  label="Department"
                  errors={errors}
                  touched={touched}
                  isRequired={true}
                  id="department"
                  name="department"
                  placeholder="sales"
                />
                <div className="flex text-base flex-col gap-1">
                  <label className="text-left">
                    Date of birth <span className="text-red-600">*</span>
                  </label>
                  <DatePicker
                    selected={values?.dob}
                    placeholderText="Date of birth"
                    dateFormat={"dd/MM/YYYY"}
                    showYearDropdown
                    showMonthDropdown
                    className="bg-transparent w-full p-2 border border-gray-400 rounded-lg"
                    onChange={(date) => setFieldValue("dob", date)}
                  />
                  {errors?.dob && touched?.dob ? (
                    <div className="text-sm font-medium text-red-600 text-left">
                      {errors?.dob}
                    </div>
                  ) : null}
                </div>
                <Input
                  label="Email"
                  errors={errors}
                  touched={touched}
                  isRequired={true}
                  id="email"
                  name="email"
                  placeholder="john@acme.com"
                  type="email"
                />
                {(initialValues?.email && role === 'workspace_admin') && (
                  <Input
                    label="Password"
                    isRequired={true}
                    errors={errors}
                    touched={touched}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end items-end gap-2">
              <button
                className="py-2 px-4 max-w-max text-black border border-gray-400 rounded-lg w-full text-xl font-medium"
                type="button"
                onClick={() => {
                  if (isEmployeesPage || addEmployee) {
                    handleToggleEmployees();
                  } else {
                    navigate(-1);
                  }
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                className="w-max p-2 text-white bg-blue-400 rounded-lg text-xl font-medium"
                type="submit"
                form="update-profile-form"
              >
                {!isEmployeesPage && !values?.name ? "Create" : "Update"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
