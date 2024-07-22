import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type props = {
  options: { [key: string]: any };
  handleChange: SelectChangeEvent | any;
  value: string;
  label: string;
  id: string;
  name: string;
  touched: { [key: string]: any };
  errors: { [key: string]: any };
  isRequired: boolean;
  [key: string]: any;
};
export default function CommonSelect(props: props) {
  const {
    options,
    handleChange,
    value,
    label,
    isRequired,
    errors,
    touched,
    id,
    name,
    placeholder,
    isDisabled,
  } = props;

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  return (
    <div className="flex gap-1 flex-col">
      <label className="text-left" htmlFor="email">
        {label} {isRequired && <span className="text-red-600">*</span>}
      </label>
      <FormControl >
        <Select
          value={value}
          id={id}
          size="small"
          classes={{
            root: "bg-transparent min-w-[250px] text-black !border text-left !border-gray-400 !rounded-lg",
          }}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
          defaultValue={placeholder}
          disabled={isDisabled}
        >
          {options?.map((item: { [key: string]: any }) => (
            <MenuItem key={item?._id} value={item?._id}>
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors?.[name] && touched?.[name] ? (
        <div className="text-sm font-medium text-red-600 text-left">
          {errors?.[name]}
        </div>
      ) : null}
    </div>
  );
}
