import React from "react";
import * as yup from "yup";
import Input from "../../Common/Input";
import { Form, Formik } from "formik";
import {
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
} from "../../Service/Workspace";
import { useNavigate } from "react-router-dom";
import UploadFile from "../../Common/FileUplaod";
import { Avatar } from "../../Assets/Icons";

type initValues = {
  email: string;
  password: string | any;
  name: string;
  phone: string;
  address: string;
  logo: string;
  [key: string]: any;
};
type Props = {
  handleToggleWorkspace: any;
  initValues: initValues;
};
const CreateWorkspace = ({ handleToggleWorkspace, initValues }: Props) => {
  const [createWorkspace] = useCreateWorkspaceMutation();
  const [updateWorkspace] = useUpdateWorkspaceMutation();
  const navigate = useNavigate();
  const initialValues: initValues = {
    email: initValues?.email || "",
    password: initValues?.password || "",
    name: initValues?.name || "",
    phone: initValues?.phone || "",
    address: initValues?.address || "",
    logo: initValues?.logo || "",
  };

  const validationSchema = initValues?.email
    ? yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        name: yup.string().required("Name is required"),
        phone: yup.string().required("Phone number is required"),
        address: yup.string().required("Address is required"),
      })
    : yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        password: yup.string().required("Password is required"),
        name: yup.string().required("Name is required"),
        phone: yup.string().required("Phone number is required"),
        address: yup.string().required("Address is required"),
      });

  const formSubmit = async (
    values: { [key: string]: any },
    { resetForm }: any
  ) => {
    try {
      const res = initValues?._id
        ? await updateWorkspace({ ...values, _id: initValues?._id })
        : await createWorkspace(values);
      if (res?.data?.status === 200) {
        resetForm();
        handleToggleWorkspace();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={formSubmit}
      >
        {({ errors, touched, resetForm, setFieldValue, values }) => (
          <Form id="create-workspace-form">
            <div className="w-full flex flex-col gap-7 h-auto py-6 rounded-lg">
              <div className="flex items-center justify-center">
                <UploadFile
                  onDrop={(e: any) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(e[0]);
                    reader.onload = () => {
                      setFieldValue("logo", reader.result);
                    };
                  }}
                >
                  <div className="rounded-full cursor-pointer border p-2 border-gray-400">
                    {values?.logo ? (
                      <img
                        width={84}
                        height={84}
                        className="w-[84px] h-[84px] object-cover rounded-full"
                        src={values?.logo}
                        alt="logo"
                      />
                    ) : (
                      <Avatar className="w-[64px] h-[64px]" />
                    )}
                  </div>
                </UploadFile>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <Input
                  label="Name"
                  errors={errors}
                  touched={touched}
                  isRequired={true}
                  id="name"
                  name="name"
                  placeholder="Workspace name"
                />
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
                {!initValues?._id && (
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
                <Input
                  label="Phone number"
                  errors={errors}
                  touched={touched}
                  isRequired={true}
                  id="phone"
                  name="phone"
                  placeholder="Workspace phone number"
                />
                <Input
                  label="Address"
                  errors={errors}
                  touched={touched}
                  isRequired={true}
                  id="address"
                  name="address"
                  placeholder="Workspace address"
                />
              </div>
              <div className="flex items-end justify-end gap-5">
                <button
                  className="py-2 px-4 max-w-max text-black border border-gray-400 rounded-lg w-full text-xl font-medium"
                  type="button"
                  onClick={() => {
                    if (initValues?.role === 'workspace_admin') {
                      navigate('/')
                    }
                    handleToggleWorkspace();
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="py-2 px-4 max-w-max text-white bg-blue-400 rounded-lg w-full text-xl font-medium"
                  type="submit"
                  form="create-workspace-form"
                >
                  {initValues?._id ? "Update" : "Create"} workspace
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateWorkspace;
