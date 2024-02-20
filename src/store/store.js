import { configureStore } from "@reduxjs/toolkit";
import layout from "../reducers/Layout/Layout";
import home from "../reducers/Home/Home";
import product from "../reducers/Product/Product";
import Brand from "../reducers/Brand/Brand";
import Castumer from "../reducers/Castumer/Castumer";
import Profile from "../reducers/Profile/Profile";

export const store = configureStore({
  reducer: {
    layout,
    home,
    product,
    Brand,
    Castumer,
    Profile,
  },
});
