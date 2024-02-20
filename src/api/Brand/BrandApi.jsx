import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

/// get
export const getBrands = createAsyncThunk("brand/gerBrands", async () => {
  try {
    let { data } = await axiosRequest.get("Brand/get-brands");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

/// add
export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (newBrand, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(
        `Brand/add-brand?BrandName=${newBrand.BrandName}`,
        newBrand,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(getBrands());
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// delete
export const deleteBrands = createAsyncThunk(
  "brands/deleteBrans",
  async (id, { dispatch }) => {
    try {
      let { data } = await axiosRequest.delete(`Brand/delete-brand?id=${id}`);
      dispatch(getBrands());
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// edit
export const editBrands = createAsyncThunk(
  "brands/editBrands",
  async (editedBrand, { dispatch }) => {
    try {
      let { data } = await axiosRequest.put(
        `Brand/update-brand?Id=${editedBrand.Id}&BrandName=${editedBrand.BrandName}`,
        editedBrand,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(getBrands());
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// brand by id
export const getBrandById = createAsyncThunk(
  "brand/getBrandById",
  async (id) => {
    try {
      let { data } = await axiosRequest.get(`Brand/get-brand-by-id?id=${id}`);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// search brand
export const searchBrand = createAsyncThunk(
  "brand/searchBrand",
  async (searchValue) => {
    try {
      let { data } = await axiosRequest.get(
        `Brand/get-brands?BrandName=${searchValue}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
