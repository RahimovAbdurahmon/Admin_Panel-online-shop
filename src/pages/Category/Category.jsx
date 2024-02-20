import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../api/Product/Product";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Skeleton,
} from "@mui/material";
import { GridView } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { setDataSubCatalog } from "../../reducers/Product/Product";

const Category = () => {
  /// dispatch
  const dispatch = useDispatch();

  /// data category
  const dataCatalog = useSelector((store) => store.product.dataCatalog);

  /// get
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  /// loading
  const isLoding = useSelector((store) => store.product.isLoding);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

  /// type chekbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-[20px] font-[600] lg:text-[30px]">Catalogs</h1>
        <FormControl className="w-[200px]">
          <InputLabel id="demo-simple-select-label">Filter Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Filter Category"
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
      </div>
      <div className="grid gap-[30px] md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-w-[1200px] mx-auto pt-[50px]">
        {isLoding
          ? skeleton.map((elem) => {
              return (
                <div key={elem}>
                  <Skeleton variant="text" height={400} />
                </div>
              );
            })
          : dataCatalog?.map((elem) => {
              return (
                <div
                  className="flex flex-col cursor-pointer text-center justify-between h-[300px]"
                  key={elem.id}
                >
                  {elem?.categoryImage.length == 0 ||
                  elem?.categoryImage == null ? (
                    <GridView sx={{ fontSize: "200px", textAlign: "center" }} />
                  ) : (
                    <img
                      className="m-auto"
                      src={`${import.meta.env.VITE_APP_FILES_URL}${
                        elem?.categoryImage
                      }`}
                      alt=""
                    />
                  )}
                  <Link
                    to={"/dashboard/categoryById"}
                    onClick={() =>
                      dispatch(setDataSubCatalog(elem.subCategories))
                    }
                    key={elem.id}
                  >
                    <h1 className="lg:text-[20px] hover:underline font-[500] text-start">
                      {elem.categoryName}
                    </h1>
                  </Link>
                  <div className="flex items-center justify-between">
                    <Rating name="simple-controlled" />
                    <Checkbox {...label} />
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Category;
