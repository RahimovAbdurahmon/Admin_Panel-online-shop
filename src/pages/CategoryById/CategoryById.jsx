import { GridView, KeyboardBackspace } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryById = () => {
  /// data subcataolog
  const dataSubCatalog = useSelector((store) => store.product.dataSubCatalog);
  const isLoding = useSelector((store) => store.product.isLoding);
  const skeleton = [1, 2, 3];

  /// navigate
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspace />
        </IconButton>
        <h1 className="text-[20px] font-[600] lg:text-[30px]">SubCatalog</h1>
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
          : dataSubCatalog.map((elem) => {
              return (
                <div
                  className="flex flex-col cursor-pointer text-center h-[300px]"
                  key={elem.id}
                >
                  <GridView sx={{ fontSize: "200px", textAlign: "center" }} />
                  <h1 className="lg:text-[20px] font-[500] text-start">
                    {elem.subCategoryName}
                  </h1>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default CategoryById;
