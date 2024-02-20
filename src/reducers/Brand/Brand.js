import { createSlice } from "@reduxjs/toolkit";
import { getBrandById, getBrands, searchBrand } from "../../api/Brand/BrandApi";

export const brand = createSlice({
  name: "brand",
  initialState: {
    data: [],
    isLoading: false,
    getBrandById: JSON.parse(localStorage.getItem("getBrandById")) || {},
    inpSearchBrand: "",
    openModalAddBrand: false,
    inpAddBrands: "",
    idx: null,
    openModalEditBrand: false,
    inpEditBrand: "",
  },
  reducers: {
    setInpSearchBrand: (state, action) => {
      state.inpSearchBrand = action.payload;
    },
    setOpenModalBrand: (state) => {
      state.openModalAddBrand = !state.openModalAddBrand;
    },
    setInpAddBrand: (state, action) => {
      state.inpAddBrands = action.payload;
    },
    setIdx: (state, action) => {
      state.idx = action.payload;
    },
    setOpenModalEditBrand: (state) => {
      state.openModalEditBrand = !state.openModalEditBrand;
    },
    setInpEditBrand: (state, action) => {
      state.inpEditBrand = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getBrands.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(getBrandById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem("getBrandById", JSON.stringify(action.payload));
      })
      .addCase(getBrandById.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(searchBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchBrand.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default brand.reducer;
export const {
  setInpSearchBrand,
  setOpenModalBrand,
  setInpAddBrand,
  setIdx,
  setOpenModalEditBrand,
  setInpEditBrand,
} = brand.actions;
