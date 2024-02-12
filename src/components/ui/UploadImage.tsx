import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Upload } from "antd";

const UploadImage = ({ setFileArray }: { setFileArray: any }) => {
  // const handleChange = (e: any) => {
  //   console.log(e.target.files);
  // setFileArray(e.target.files as File[]);
  // Push the file to the fileArray
  // Add the file to the fileArray if it's not already present
  // setFileArray((prevFileArray: File[]) => {
  //   const isFileInArray = prevFileArray.some(
  //     (existingFile) => existingFile.name === file.originFileObj.name
  //   );

  //   if (!isFileInArray) {
  //     return [...prevFileArray, file.originFileObj];
  //   }

  //   return prevFileArray;
  // });
  // console.log(file);
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      // Convert FileList to an array
      const filesArray = Array.from(selectedFiles);

      setFileArray(filesArray);
    }
  };

  return (
    <>
      <Input
        type="file"
        size="large"
        placeholder="Product Image"
        onChange={handleChange}
        multiple
      />
    </>
  );
};

export default UploadImage;
