import { IProduct, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const PRODUCT_URL = "/products";

export const productApi = baseApi.injectEndpoints({
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

    // admins: build.query({
    //   query: (arg: Record<string, any>) => {
    //     return {
    //       url: ADMIN_URL,
    //       method: "GET",
    //       params: arg,
    //     };
    //   },
    //   transformResponse: (response: IAdmin[], meta: IMeta) => {
    //     return {
    //       admins: response,
    //       meta,
    //     };
    //   },
    //   providesTags: [tagTypes.admin],
    // }),
    // admin: build.query({
    //   query: (id: string | string[] | undefined) => ({
    //     url: `${ADMIN_URL}/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.admin],
    // }),
    // updateAdmin: build.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.admin],
    // }),
    // deleteAdmin: build.mutation({
    //   query: (id) => ({
    //     url: `${ADMIN_URL}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.admin],
    // }),
  }),
});

export const {
  //   useAdminsQuery,
  //   useAdminQuery,
  useAddProductWithFormDataMutation,
  //   useUpdateAdminMutation,
  //   useDeleteAdminMutation,
} = productApi;
