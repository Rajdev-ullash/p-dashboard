"use client";
import Form from "@/components/Forms/Form";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadExcel from "@/components/ui/UploadExcel";

import { useAddProductWithExcelMutation } from "@/redux/api/productApi";

import { Button, Col, Row, message } from "antd";
import { useState } from "react";

const page = () => {
  const [file, setFile] = useState<File | null>(null);

  const [addProductWithExcel] = useAddProductWithExcelMutation();
  const onSubmit = async (data: any) => {
    // console.log(data);
    console.log(file);
    if (!file) {
      message.error("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const data: any = await addProductWithExcel(formData);
      console.log(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "merchant",
            link: "/merchant",
          },
          {
            label: "manage product",
            link: "/merchant/manage-product",
          },
        ]}
      />
      <h1>Upload product excel file</h1>
      <div>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Upload Excel File
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadExcel setFile={setFile} />
                {/* <ImageUpload setFileArray={setFileArray} /> */}
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default page;
