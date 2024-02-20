import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import {
  setInpAddProductDiscountPrice,
  setInpAddProductHasDiscounted,
  setInpAddProductImage,
  setInpAddProductName,
  setInpAddProductPrice,
  setInpAddProductQuantity,
  setOpenDialogAddProduct,
} from "../../reducers/Product/Product";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { addProduct, editProduct } from "../../api/Product/Product";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  // dispatch
  const dispatch = useDispatch();

  // dialog
  const openDialogAddProduct = useSelector(
    (store) => store.product.openDialogAddProduct
  );

  /// state edit
  const stateEdit = useSelector((store) => store.product.stateEdit);
  // console.log(stateEdit);

  /// values
  const inpAddProductImage = useSelector(
    (store) => store.product.inpAddProductImage
  );
  const inpAddProductName = useSelector(
    (store) => store.product.inpAddProductName
  );
  const inpAddProductQuantity = useSelector(
    (store) => store.product.inpAddProductQuantity
  );
  const inpAddProductPrice = useSelector(
    (store) => store.product.inpAddProductPrice
  );
  const inpAddProductDiscountPrice = useSelector(
    (store) => store.product.inpAddProductDiscountPrice
  );
  const selAddProductHasDiscounted = useSelector(
    (store) => store.product.selAddProductHasDiscounted
  );

  /// product for edit
  const productForEdit = useSelector((store) => store.product.productForEdit);
  console.log(productForEdit);
  // if (stateEdit == true) {
  //   dispatch(setInpAddProductName(productForEdit.productName));
  //   dispatch(setInpAddProductQuantity(productForEdit.quantity));
  //   dispatch(setInpAddProductPrice(productForEdit.price));
  //   dispatch(setInpAddProductDiscountPrice(productForEdit.discountPrice));
  //   dispatch(
  //     setInpAddProductHasDiscounted(productForEdit.hasDiscount ? "Yes" : "No")
  //   );
  // }

  //   add submit
  const handleSubmit = (event) => {
    event.preventDefault();
    let newProduct = new FormData();
    newProduct.append("Images", event.target.image.files[0]);
    newProduct.append("BrandId", 140);
    newProduct.append("ColorId", 2);
    newProduct.append("ProductName", event.target.name.value);
    newProduct.append("Description", "Description");
    newProduct.append("Quantity", event.target.quantity.value);
    newProduct.append("Code", new Date().getTime());
    newProduct.append("Price", event.target.price.value);
    newProduct.append(
      "HasDiscount",
      selAddProductHasDiscounted == "Yes" ? true : false
    );
    newProduct.append("DiscountPrice", event.target.discount.value);
    newProduct.append("SubCategoryId", 401);
    dispatch(setOpenDialogAddProduct());
    dispatch(addProduct(newProduct));
  };

  // edit submit
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    let editedProduct = {
      Id: productForEdit.id,
      BrandId: 140,
      ColorId: 2,
      ProductName: inpAddProductName,
      Description: "Description",
      Quantity: +inpAddProductQuantity,
      Code: new Date().getTime(),
      Price: +inpAddProductPrice,
      HasDiscount: selAddProductHasDiscounted == "Yes" ? true : false,
      DiscountPrice: +inpAddProductDiscountPrice,
      SubCategoryId: 401,
    };
    dispatch(setOpenDialogAddProduct());
    dispatch(editProduct(editedProduct));
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialogAddProduct}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => dispatch(setOpenDialogAddProduct())}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <p className="text-[20px] font-[600] font-custom">Add New Product</p>
          <IconButton onClick={() => dispatch(setOpenDialogAddProduct())}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              stateEdit ? handleSubmitEdit(e) : handleSubmit(e);
            }}
            className="form w-[400px] flex flex-col gap-[10px] items-start"
          >
            {/* inp img */}
            {stateEdit ? null : (
              <input
                type="file"
                name="image"
                value={inpAddProductImage}
                onChange={(e) =>
                  dispatch(setInpAddProductImage(e.target.value))
                }
                id="image"
                required
              />
            )}
            {/* inp name */}
            <TextField
              label="Product Name"
              name="name"
              type="text"
              value={inpAddProductName}
              onChange={(event) =>
                dispatch(setInpAddProductName(event.target.value))
              }
              id="name"
              required
              fullWidth
            />
            <div className="flex items-center justify-between gap-[10px]">
              {/* inp quantity */}
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                id="quantity"
                value={inpAddProductQuantity}
                onChange={(event) =>
                  dispatch(setInpAddProductQuantity(event.target.value))
                }
                required
                fullWidth
              />
              {/* inp price */}
              <TextField
                label="Price"
                name="price"
                id="price"
                type="number"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={inpAddProductPrice}
                onChange={(event) =>
                  dispatch(setInpAddProductPrice(event.target.value))
                }
                fullWidth
              />
            </div>
            <div className="grid grid-cols-2 gap-[10px]">
              {/* inp discount */}
              <TextField
                label="Discount"
                name="discount"
                fullWidth
                id="discount"
                type="number"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={inpAddProductDiscountPrice}
                onChange={(event) =>
                  dispatch(setInpAddProductDiscountPrice(event.target.value))
                }
              />
              {/* inp has discount */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  HasDiscount
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="HasDiscount"
                  value={selAddProductHasDiscounted}
                  onChange={(event) =>
                    dispatch(setInpAddProductHasDiscounted(event.target.value))
                  }
                  fullWidth
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <DialogActions>
              {stateEdit ? (
                <Button variant="contained" color="info" type="submit">
                  Edit
                </Button>
              ) : (
                <Button variant="contained" type="submit" color="info">
                  Submit
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => dispatch(setOpenDialogAddProduct())}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
