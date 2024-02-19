import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Upload } from "antd";

const UploadExcel = ({ setFile }: { setFile: any }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target?.files?.[0]; // Use optional chaining and nullish coalescing
    if (selectedFiles) {
      setFile(selectedFiles);
      console.log(selectedFiles);
    }
  };

  return (
    <>
      <Input
        type="file"
        size="large"
        placeholder="Product file"
        onChange={handleChange}
      />
    </>
  );
};

export default UploadExcel;
