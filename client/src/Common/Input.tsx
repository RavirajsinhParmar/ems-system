import { Field } from "formik";
import React from "react";

type Props = {
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  label?: string;
  id?: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  isRequired?: boolean;
};

const Input = (props: Props) => {
  const {
    errors,
    touched,
    label,
    id,
    name,
    placeholder,
    type,
    className,
    isRequired,
  } = props;
  return (
    <div className="flex text-base flex-col gap-1">
      <label className="text-left" htmlFor="email">
        {label} {isRequired && <span className="text-red-600">*</span>}
      </label>
      <Field
        className={`${className} bg-transparent min-w-[250px] border border-gray-400 p-2 rounded-lg`}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      {errors?.[name] && touched?.[name] ? (
        <div className="text-sm font-medium text-red-600 text-left">
          {errors?.[name]}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
