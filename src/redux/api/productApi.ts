import { IProduct, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const PRODUCT_URL = "/products";

export const productApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProductWithFormData: build.mutation({
      query: (data) => ({
        url: PRODUCT_URL,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product],
    }),
    addProductWithExcel: build.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/upload-excel`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product],
    }),
    products: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: PRODUCT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IProduct[], meta: IMeta) => {
        return {
          products: response,
          meta,
        };
      },
      providesTags: [tagTypes.product],
    }),
    product: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    updateProduct: build.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.product],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useProductsQuery,
  useProductQuery,
  useAddProductWithFormDataMutation,
  useAddProductWithExcelMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
