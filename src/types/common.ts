export interface IMeta {
  limit: number;
  page: number;
  size: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface ICategory {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: string;
  title: string;
  slug?: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  unit: string;
  sell?: number;
  createdAt: string;
  updatedAt: string;
  productTags: string[];
  productImages: JSON[];
  discount?: number;
  afterDiscountPrice?: number;
}
