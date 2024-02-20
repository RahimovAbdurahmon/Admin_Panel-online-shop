import { createSlice } from "@reduxjs/toolkit";
import { getCustumer, getCustumerById } from "../../api/Castumer/CastumerApi";

const Custumer = createSlice({
  name: "custumer",
  initialState: {
    data: [],
    isLoading: false,
    custumerById: JSON.parse(localStorage.getItem("custumerById")) || {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustumer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustumer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getCustumer.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(getCustumerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustumerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.custumerById = action.payload
        localStorage.setItem("custumerById", JSON.stringify(action.payload));
      })
      .addCase(getCustumerById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default Custumer.reducer;
