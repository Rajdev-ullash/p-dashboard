"use client";
import ActionBar from "@/components/ui/ActionBar";
import PDTable from "@/components/ui/PDTable";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useProductsQuery } from "@/redux/api/productApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, Tag } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { IProduct } from "@/types";
import dayjs from "dayjs";

const ManageProductPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useProductsQuery({ ...query });
  // console.log(data.products, isLoading);

  const products = data?.products;

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Total Sell",
      dataIndex: "sell",
    },
    {
      title: "Image",
      dataIndex: "productImages",
      render: function (images: any) {
        return (
          <>
            {images?.length > 0 ? (
              images.map((img: any, index: any) => (
                <img
                  key={index}
                  src={img.url.secure_url}
                  alt={`Product Image ${index + 1}`}
                  style={{
                    maxWidth: "50px",
                    maxHeight: "50px",
                    marginRight: "5px",
                  }}
                />
              ))
            ) : (
              <span>No images available</span>
            )}
          </>
        );
      },
    },

    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Discount Price",
      dataIndex: "afterDiscountPrice",
    },
    {
      title: "Tags",
      dataIndex: "productTags",
      render: function (tags: any) {
        return (
          <>
            {tags.length > 0 &&
              tags.map((tagSet: string, index: number) => {
                // Check if tags are in the correct format
                const tagArray = tagSet
                  .replace(/'/g, "") // Remove single quotes
                  .split(",");

                // Check if each tag in tagArray is not empty
                const isValidFormat = tagArray.every(
                  (tag) => tag.trim() !== ""
                );

                return isValidFormat ? (
                  <div key={index}>
                    {tagArray.map((tag: string, subIndex: number) => {
                      let color = tag.length > 5 ? "geekblue" : "green";
                      if (tag === "loser") {
                        color = "volcano";
                      }
                      return (
                        <Tag color={color} key={subIndex}>
                          {tag.trim().toUpperCase()}
                        </Tag>
                      );
                    })}
                  </div>
                ) : (
                  // Handle invalid format
                  <div key={index}>
                    <Tag color="volcano">Invalid Format</Tag>
                  </div>
                );
              })}
          </>
        );
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "slug",
      render: function (data: any) {
        return (
          <>
            {/* <Link href={`/merchant/product/details/${data.id}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link> */}
            <Link href={`/merchant/manage-product/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button onClick={() => console.log(data)} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div style={{ margin: "0px 5px" }}>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />
      <ActionBar title="Manage product page">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{
            width: "20%",
            margin: "0 5px",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link href="/merchant/manage-product/create">
            <Button type="primary" style={{ margin: "0px 5px" }}>
              Create Product
            </Button>
          </Link>
          <Link href="/merchant/manage-product/upload-excel">
            <Button type="primary" style={{ margin: "0px 5px" }}>
              Upload Excel File
            </Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <PDTable
        loading={isLoading}
        columns={columns}
        dataSource={products?.data}
        pageSize={size}
        totalPages={products?.meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageProductPage;
