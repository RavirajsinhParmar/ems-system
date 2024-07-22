import React from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import Input from "../../Common/Input";
import { useSignupMutation } from "../../Service/Auth.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import UploadFile from "../../Common/FileUplaod";
import { Avatar } from "../../Assets/Icons";
import { useGetWorkspacesQuery } from "../../Service/Workspace";
import CommonSelect from "../../Common/Select";
import { SelectChangeEvent } from "@mui/material";

type initValues = {
  name: String;
  company: String;
  mobile: String;
  dob: Date | null;
  department: String;
  profilePicture: string;
  password: String;
  email: String;
};

type formData = {
  errors: { [key: string]: any };
  touched: { [key: string]: any };
  values: { [key: string]: any };
  setFieldValue: any;
};

const Signup = () => {
  const [SignUp] = useSignupMutation();

  const { data } = useGetWorkspacesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const navigate = useNavigate();
  const initialValues: initValues = {
    name: "",
    company: "",
    mobile: "",
    dob: null,
    department: "",
    profilePicture: "",
    password: "",
    email: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("password is required"),
    name: yup.string().required("Name is required"),
    company: yup.string().required("Company is required"),
    mobile: yup.string().required("Contact is required"),
    dob: yup.date().required("Date of birth is required"),
    department: yup.string().required("department is required"),
    profilePicture: yup.string().required("p is required"),
  });

  const formSubmit = async (
    values: { [key: string]: any },
    { resetForm }: any
  ) => {
    try {
      const res = await SignUp({
        ...values,
        dob: new Date(values.dob),
      });
      if (res?.data?.status === 200) {
        window?.localStorage?.setItem("token", res?.data?.token);
        navigate("/login");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={formSubmit}
      >
        {({ errors, touched, values, setFieldValue }: formData) => {
          return (
            <Form id="signup-form">
              <div className="w-max flex flex-col gap-5 h-auto bg-[#ffffff] backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-400 p-5 rounded-lg">
                <div className="w-max flex flex-col gap-5 h-auto">
                  <div className="text-3xl font-semibold">Register</div>
                  <div className="flex gap-1 pr-1 justify-center">
                    Already have an account?
                    <Link className="text-blue-800 font-semibold" to={"/login"}>
                      Login
                    </Link>
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <UploadFile
                      onDrop={(e: { [key: string]: any }) => {
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
                  <div className="grid grid-cols-2 gap-4">
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
                      placeholder="Enter company name"
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
                      id="mobile"
                      name="mobile"
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
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="p-2 text-white bg-blue-400 rounded-lg w-full text-xl font-medium"
                    type="submit"
                    form="signup-form"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
