import React, { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Common/Input";
import { useLoginMutation } from "../../Service/Auth";
import { Checkbox, FormControlLabel } from "@mui/material";

type Props = {};
type initValues = {
  email: string;
  password: string;
};
const Login = (props: Props) => {
  const navigate = useNavigate();
  const [isWorkspace, setIsWorkspace] = useState(false);
  const [Login] = useLoginMutation();
  const initialValues: initValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("password is required"),
  });

  const formSubmit = async (
    values: { [key: string]: any },
    { resetForm }: any
  ) => {
    try {
      const res = await Login({ ...values, isWorkspace });
      if (res?.data?.status === 200) {
        const {
          name,
          email,
          phone,
          department,
          dob,
          company,
          profilePicture,
          role,
        } = res?.data?.user;
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
            role,
            ...res?.data?.user
          })
        );
        window?.localStorage?.setItem("token", res?.data?.user?.token);
        navigate("/");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={formSubmit}
      >
        {({ errors, touched }) => (
          <Form id="login-form">
            <div className="w-[400px] flex flex-col gap-5 h-auto bg-[#ffffff] backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-400 p-5 rounded-lg">
              <div className="text-3xl font-semibold">Login</div>
              <div className="flex gap-1 pr-1 justify-center">
                Don't have an account?
                <Link className="text-blue-800 font-semibold" to={"/signup"}>
                  Sign up
                </Link>
              </div>
              <div className="flex flex-col gap-4">
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

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isWorkspace}
                      onChange={() => setIsWorkspace(!isWorkspace)}
                      name="gilad"
                    />
                  }
                  label="Log in as Workspace admin"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="p-2 text-white bg-blue-400 rounded-lg w-full text-xl font-medium"
                  type="submit"
                  form="login-form"
                >
                  Continue
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
