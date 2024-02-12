"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTag from "@/components/Forms/FormTag";
import ImageUpload from "@/components/ui/ImageUpload";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useAddProductWithFormDataMutation } from "@/redux/api/productApi";
import { ICategory } from "@/types";
import { Button, Col, Row, UploadFile, message } from "antd";
import { useState } from "react";

const page = () => {
  const [fileArray, setFileArray] = useState([]);
  const { data, isLoading } = useCategoriesQuery({ limit: 100, page: 1 });
  //@ts-ignore
  const categories: ICategory[] = data?.categories?.data;

  const CategoriesOptions =
    categories &&
    categories?.map((category) => {
      return {
        label: category?.title,
        value: category?.id,
      };
    });

  const [addProductWithFormData] = useAddProductWithFormDataMutation();
  const onSubmit = async (data: any) => {
    // console.log(data);
    console.log(fileArray);
    const formData = new FormData();
    formData.append("title", data["title"]);
    formData.append("description", data["description"]);
    // formData.append('title', data["title"]);

    fileArray.forEach((file) => {
      //@ts-ignore
      formData.append("productImages", file);
    });
    // formData.append("discount", data["discount"]);

    try {
      await addProductWithFormData(formData);
      // console.log(formData);
      message.success("Admin created successfully!");
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
      <h1>Create product</h1>
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
              Product Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Product Title"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="description"
                  size="large"
                  label="Product Description"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="number"
                  name="price"
                  size="large"
                  label="Product Price"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="categoryId"
                  options={CategoriesOptions}
                  label="category"
                  placeholder="select category"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="number"
                  name="stock"
                  size="large"
                  label="Product Stock"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="unit"
                  size="large"
                  label="Product Unit Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                {/* <UploadImage setFileArray={setFileArray} /> */}
                <ImageUpload setFileArray={setFileArray} />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTag name="productTags" label="Product Tags" />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="number"
                  name="discount"
                  size="large"
                  label="Product Discount"
                />
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
