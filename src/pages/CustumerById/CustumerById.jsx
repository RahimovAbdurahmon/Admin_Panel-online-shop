import { Dehaze, KeyboardBackspace } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getCustumerById } from "../../api/Castumer/CastumerApi";

const CustumerById = () => {
  /// navigate
  const navigate = useNavigate();

  /// data
  const custumerById = useSelector((store) => store.Castumer.custumerById);

  return (
    <>
      <div className="flex items-center justify-between p-[10px] rounded-[10px] bg-gray-50">
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspace />
        </IconButton>
        <IconButton>
          <Dehaze />
        </IconButton>
      </div>
      <div className="flex items-start justify-between flex-wrap">
        <div className="flex items-start gap-[20px] p-[20px] py-[50px]">
          {custumerById?.image?.length == 0 || custumerById?.image?.length == null ? (
            <Avatar sx={{ width: "150px", height: "150px" }} />
          ) : (
            <img
              src={`${import.meta.env.VITE_APP_FILES_URL}${custumerById?.image}`}
              className="w-[250px] h-[250px] rounded-[50%]"
              alt=""
            />
          )}
          <h1 className="text-[20px] font-[600] lg:text-[30px]">{custumerById?.userName}</h1>
        </div>
        <div className="p-[20px] rounded-[5px] bg-gray-50 lg:w-[400px] m-[50px]">
          <ul className="flex flex-col gap-[20px] items-start w-[100%]">
            <li className="flex items-center justify-between w-[100%]">
              <span className="text-gray-500 text-[20px]">First Name: </span>
              <span className="text-[22px] font-[600]">{custumerById?.firstName || "FirstName"}</span>
            </li>
            <li className="flex items-center justify-between w-[100%]">
              <span className="text-gray-500 text-[20px]">Last Name: </span>
              <span className="text-[22px] font-[600]">{custumerById?.lastName || "LastName"}</span>
            </li>
            <li className="flex items-center justify-between w-[100%]">
              <span className="text-gray-500 text-[20px]">Email: </span>
              <span className="text-[22px] font-[600]">{custumerById?.email || "Email"}</span>
            </li>
            <li className="flex items-center justify-between w-[100%]">
              <span className="text-gray-500 text-[20px]">Date: </span>
              <span className="text-[22px] font-[600]">{custumerById?.dob || "DataJoin"}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustumerById;
