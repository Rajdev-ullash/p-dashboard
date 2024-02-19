"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTag from "@/components/Forms/FormTag";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useProductQuery } from "@/redux/api/productApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";
import { useUpdateProductMutation } from "../../../../../../redux/api/productApi";
import { useRouter } from "next/navigation";

type IPProps = {
  params: any;
};

const EditProductPage = ({ params }: IPProps) => {
  const router = useRouter();
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

  const { id } = params;

  const { data: productData, isLoading: isLoadings } = useProductQuery(id);
  let tagInfo: string[] = [];
  const tagsFromBackend = productData?.data?.productTags || [];

  tagsFromBackend.forEach((tagSet: string) => {
    const tagArray = tagSet
      .split(",") // Split without removing single quotes
      .map((tag) => tag.trim()); // Trim spaces

    // Check if each tag in tagArray is not empty
    const isValidFormat = tagArray.every((tag) => tag.trim() !== "");

    // Concatenate the tagArray to tagInfo if it's valid
    if (isValidFormat) {
      tagInfo = [...tagInfo, ...tagArray];
    }
  });

  const defaultValues = {
    title: productData?.data?.title || "",
    description: productData?.data?.description || "",
    price: productData?.data?.price || "",
    categoryId: productData?.data?.categoryId || "",
    stock: productData?.data?.stock || "",
    productTags: tagInfo,
    productImages: productData?.data?.productImages || "",
    discount: productData?.data?.discount || "",
    unit: productData?.data?.unit || "",
  };

  const [updateProduct] = useUpdateProductMutation();
  const onSubmit = async (values: any) => {
    console.log(values);

    // const formData = new FormData();
    // formData.append("title", values["title"]);
    // formData.append("description", values["description"]);
    // formData.append("price", values["price"]);
    // formData.append("categoryId", values["categoryId"]);
    // formData.append("stock", values["stock"]);
    // formData.append("unit", values["unit"]);
    // formData.append("sell", values["sell"]);
    // formData.append("productTags", values["productTags"]);
    // formData.append("discount", values["discount"]);

    // fileArray.forEach((file) => {
    //   //@ts-ignore
    //   formData.append("productImages", file);
    // });

    message.loading("Updating.....");

    try {
      const data = await updateProduct({ id, body: values });
      console.log(data);
      if (data?.data?.success === true) {
        // message.success(data?.data?.message);
        // router.push("/merchant/manage-product");
        message.success({
          content: data?.data?.message,
          onClose: () => router.push("/merchant/manage-product"),
        });
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  // console.log(params);
  // const { role } = getUserInfo() as any;

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `merchant`,
            link: `/merchant`,
          },
          {
            label: `manage-product`,
            link: `/merchant/manage-product`,
          },
        ]}
      />
      <ActionBar title="Update Product"></ActionBar>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
            {/* <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <UploadImage setFileArray={setFileArray} />
            </Col> */}
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
          Update
        </Button>
      </Form>
      {/* <h1>edit page {params}</h1> */}
    </div>
  );
};

export default EditProductPage;
