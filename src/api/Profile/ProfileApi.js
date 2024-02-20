import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../../utils/token";
import { axiosRequest } from "../../utils/axiosRequest";

/// token
let userId = getToken();

/// get
export const getProfileById = createAsyncThunk(
  "profile/getProfileById",
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

/// delete profile by id
export const deleteProfileById = createAsyncThunk(
  "profile/deleteProfileById",
  async (id) => {
    try {
      let { data } = await axiosRequest.delete(
        `UserProfile/delete-user?id=${id}`
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// edit
export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (newEditUser, { dispatch }) => {
    try {
      let { data } = await axiosRequest.put(
        "UserProfile/update-user-profile",
        newEditUser,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(getProfileById(userId.sid));
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
