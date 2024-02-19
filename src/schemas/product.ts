import * as yup from "yup";

export const productSchema = yup.object().shape({
  title: yup.string().required("Product name must be required"),
  description: yup.string().required("Product description must be required"),
  price: yup
    .number()
    .required("Product price must be required and must be number"),
  categoryId: yup.string().required("Product category must be required"),
  stock: yup
    .number()
    .required("Product stock must be required and must be number"),
  unit: yup.string().required("Product unit must be required"),
  productTags: yup.string().required("Product tag must be required"),
  discount: yup.number().required("Product discount must be required"),
});
