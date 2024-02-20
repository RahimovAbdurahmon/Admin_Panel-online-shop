import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getCategory,
  getProducts,
} from "../../api/Product/Product";
import { Delete, Edit } from "@mui/icons-material";
import {
  setInpAddProductDiscountPrice,
  setInpAddProductHasDiscounted,
  setInpAddProductName,
  setInpAddProductPrice,
  setInpAddProductQuantity,
  setOpenDialogAddProduct,
  setProductForEdit,
  setStateEdit,
} from "../../reducers/Product/Product";
import AlertDialogSlide from "../../components/DialogAddProduct/DialogAddProduct";

const Product = () => {
  /// chart
  const [state] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  <ReactApexChart
    options={state.options}
    series={state.series}
    type="pie"
    width={380}
  />;

  // dispatch
  const dispatch = useDispatch();

  /// data catolog
  const dataCatalog = useSelector((store) => store.product.dataCatalog);

  /// data product
  const dataProducts = useSelector((store) => store.product.dataProducts);
  const isLoding = useSelector((store) => store.product.isLoding);
  const skeleton = [1, 2, 3];

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProducts());
  }, [dispatch]);

  /// product for edit
  // const productForEdit = useSelector((store) => store.product.productForEdit);

  /// values
  // const inpAddProductImage = useSelector(
  //   (store) => store.product.inpAddProductImage
  // );
  // const inpAddProductName = useSelector(
  //   (store) => store.product.inpAddProductName
  // );
  // const inpAddProductQuantity = useSelector(
  //   (store) => store.product.inpAddProductQuantity
  // );
  // const inpAddProductPrice = useSelector(
  //   (store) => store.product.inpAddProductPrice
  // );
  // const inpAddProductDiscountPrice = useSelector(
  //   (store) => store.product.inpAddProductDiscountPrice
  // );
  // const selAddProductHasDiscounted = useSelector(
  //   (store) => store.product.selAddProductHasDiscounted
  // );

  return (
    <>
      <div className="flex items-center justify-between gap-[30px] flex-wrap max-w-[1200px] mx-auto">
        <h1 className="text-[20px] font-[600] lg:text-[30px] font-custom">
          Products
        </h1>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            dispatch(setOpenDialogAddProduct());
            dispatch(setStateEdit(""));
            dispatch(setInpAddProductName(""));
            dispatch(setInpAddProductQuantity(""));
            dispatch(setInpAddProductPrice(""));
            dispatch(setInpAddProductDiscountPrice(""));
            dispatch(setInpAddProductHasDiscounted(""));
          }}
        >
          Add Product +
        </Button>
      </div>
      <section className="main p-[20px] bg-gray-50 mt-[10px] rounded-[10px]">
        <nav className="flex items-center justify-between gap-[50px] border-b-2 pb-[10px] flex-wrap">
          <TextField label="Search" className="lg:w-[400px]" />
          <FormControl className="w-[200px]">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              {dataCatalog?.map((elem) => {
                return (
                  <MenuItem key={elem.id} value={elem.categoryName}>
                    {elem.categoryName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </nav>
        <main className="py-[20px] grid xl:grid-cols-3 gap-[30px]">
          {isLoding
            ? skeleton.map((elem) => {
                return (
                  <div key={elem}>
                    <Skeleton variant="text" width="300px" height="400px" />
                  </div>
                );
              })
            : dataProducts?.products?.map((elem) => {
                return (
                  <div
                    key={elem.id}
                    className="p-[20px] rounded-[8px] border-2 flex flex-col justify-between"
                  >
                    <div className="flex items-end pb-[20px]">
                      <img
                        src={`${import.meta.env.VITE_APP_FILES_URL}${
                          elem?.image
                        }`}
                        className="m-auto w-[200px]"
                        alt=""
                      />
                      <div className="flex">
                        <Edit />
                        <Delete sx={{ color: "red" }} />
                      </div>
                    </div>
                    <h1 className="text-[20px] font-[600]">
                      {elem?.productName}
                    </h1>
                    <div className="flex items-center justify-between p-[10px]">
                      <h1 className="text-red-500 font-[600]">{elem.price}</h1>
                      <p className="line-through text-[16px] text-gray-500">
                        {elem?.discountPrice}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<Edit />}
                        size="small"
                        onClick={() => {
                          dispatch(setOpenDialogAddProduct());
                          dispatch(setProductForEdit(elem));
                          dispatch(setStateEdit(true));
                          dispatch(setInpAddProductName(elem.productName));
                          dispatch(setInpAddProductQuantity(elem.quantity));
                          dispatch(setInpAddProductPrice(elem.price));
                          dispatch(
                            setInpAddProductDiscountPrice(elem.discountPrice)
                          );
                          dispatch(
                            setInpAddProductHasDiscounted(
                              elem.hasDiscount ? "Yes" : "No"
                            )
                          );
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => dispatch(deleteProduct(elem.id))}
                        color="error"
                        startIcon={<Delete />}
                        size="small"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
        </main>
      </section>
      <AlertDialogSlide />
    </>
  );
};

export default Product;
