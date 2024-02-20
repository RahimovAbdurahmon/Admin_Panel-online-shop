import { KeyboardBackspace } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import brand from "../../assets/images/brand.png";

const BrandById = () => {
  // navigate
  const navigate = useNavigate();

  /// get data
  const getBrandById = useSelector((store) => store.Brand.getBrandById);

  return (
    <>
      <div className="flex items-center justify-between">
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspace />
        </IconButton>
        <h1 className="text-[20px] font-[600] lg:text-[25px]">Brand by id</h1>
      </div>
      <div className="flex items-start gap-[50px]">
        <img src={brand} alt="" />
        <h1 className="text-[20px] items-center font-[600] lg:text-[30px]">
          {getBrandById?.brandName}
        </h1>
      </div>
    </>
  );
};

export default BrandById;
