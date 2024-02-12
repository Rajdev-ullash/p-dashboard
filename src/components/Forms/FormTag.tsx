// import React from "react";
// import { Select } from "antd";

// const handleChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

// const FormTag = () => (
//   <Select
//     mode="tags"
//     style={{ width: "100%" }}
//     placeholder="Tags Mode"
//     onChange={handleChange}
//   />
// );

// export default FormTag;

"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  // options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
};

const FormTag = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  // options,
  label,
  defaultValue,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={onChange}
            size={size}
            // options={options}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
            allowClear
            mode="tags"
          />
        )}
      />
    </>
  );
};

export default FormTag;
