import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

/// get users custumers
export const getCustumer = createAsyncThunk(
  "custumer/getCustumer",
  async () => {
    try {
      let { data } = await axiosRequest.get("UserProfile/get-user-profiles");
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// get
export const getCustumerById = createAsyncThunk(
  "custumer/getCustumerById",
  async (id) => {
    try {
      let { data } = await axiosRequest.get(
        `UserProfile/get-user-profile-by-id?id=${id}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
