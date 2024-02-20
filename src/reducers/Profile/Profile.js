import { createSlice } from "@reduxjs/toolkit";
import { getProfileById } from "../../api/Profile/ProfileApi";

const profile = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    dialogEditProfile: false,
    inpEditImgProfile: "",
    inpEditFirstNameProfile: "",
    inpEditLastNameProfile: "",
    inpEditEmailProfile: "",
    inpEditPhoneProfile: "",
  },
  reducers: {
    setDialogEditProfile: (state) => {
      state.dialogEditProfile = !state.dialogEditProfile;
    },
    setInpEditImgProfile: (state, action) => {
      state.inpEditImgProfile = action.payload;
    },
    setInpEditFirstNameProfile: (state, action) => {
      console.log(action.payload);
      state.inpEditFirstNameProfile = action.payload;
    },
    setInpEditLastNameProfile: (state, action) => {
      state.inpEditLastNameProfile = action.payload;
    },
    setInpEditEmailProfile: (state, action) => {
      state.inpEditEmailProfile = action.payload;
    },
    setInpEditPhoneProfile: (state, action) => {
      state.inpEditPhoneProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileById.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default profile.reducer;
export const {
  setDialogEditProfile,
  setInpEditImgProfile,
  setInpEditFirstNameProfile,
  setInpEditLastNameProfile,
  setInpEditEmailProfile,
  setInpEditPhoneProfile,
} = profile.actions;
