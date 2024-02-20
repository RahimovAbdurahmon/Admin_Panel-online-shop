import { createSlice } from "@reduxjs/toolkit";
import { getCategory, getProducts } from "../../api/Product/Product";

export const product = createSlice({
  name: "product",
  initialState: {
    dataCatalog: [],
    dataSubCatalog: [],
    isLoding: false,
    dataProducts: [],
    openDialogAddProduct: false,
    inpAddProductImage: "",
    inpAddProductName: "",
    inpAddProductQuantity: "",
    inpAddProductPrice: "",
    inpAddProductDiscountPrice: "",
    selAddProductHasDiscounted: "",
    productForEdit: {},
    stateEdit: false,
  },
  reducers: {
    setOpenDialogAddProduct: (state) => {
      state.openDialogAddProduct = !state.openDialogAddProduct;
    },
    setInpAddProductImage: (state, action) => {
      state.inpAddProductImage = action.payload;
    },
    setInpAddProductName: (state, action) => {
      state.inpAddProductName = action.payload;
    },
    setInpAddProductQuantity: (state, action) => {
      state.inpAddProductQuantity = action.payload;
    },
    setInpAddProductPrice: (state, action) => {
      state.inpAddProductPrice = action.payload;
    },
    setInpAddProductDiscountPrice: (state, action) => {
      state.inpAddProductDiscountPrice = action.payload;
    },
    setInpAddProductHasDiscounted: (state, action) => {
      state.selAddProductHasDiscounted = action.payload;
    },
    setProductForEdit: (state, action) => {
      state.productForEdit = action.payload;
    },
    setStateEdit: (state, action) => {
      state.stateEdit = action.payload;
    },
    setDataSubCatalog: (state, action) => {
      state.dataSubCatalog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoding = false;
        state.dataCatalog = action.payload;
      })
      .addCase(getCategory.rejected, (state) => {
        state.isLoding = false;
      });
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoding = false;
        state.dataProducts = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoding = false;
      });
  },
});

export default product.reducer;
export const {
  setOpenDialogAddProduct,
  setInpAddProductImage,
  setInpAddProductName,
  setInpAddProductQuantity,
  setInpAddProductPrice,
  setInpAddProductDiscountPrice,
  setInpAddProductHasDiscounted,
  setProductForEdit,
  setStateEdit,
  setDataSubCatalog,
} = product.actions;
