import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

/// category
export const getCategory = createAsyncThunk("product/getCatalog", async () => {
  try {
    let { data } = await axiosRequest.get("Category/get-categories");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

/// product
export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    let { data } = await axiosRequest.get("Product/get-products");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

/// add product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (newProduct, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(
        "Product/add-product",
        newProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(getProducts());
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch }) => {
    try {
      let { data } = await axiosRequest.delete(
        `Product/delete-product?id=${id}`
      );
      dispatch(getProducts());
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// edit product
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (
    { Id, ProductName, Quantity, Code, Price, DiscountPrice },
    { dispatch }
  ) => {
    try {
      let { data } = await axiosRequest.put(
        `Product/update-product?Id=${Id}&BrandId=140&ColorId=2&ProductName=${ProductName}&Description=description&Quantity=${Quantity}&Code=${Code}&Price=${Price}&HasDiscount=true&DiscountPrice=${DiscountPrice}&SubCategoryId=401`
      );
      dispatch(getProducts());
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
