import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustumer, getCustumerById } from "../../api/Castumer/CastumerApi";
import { Avatar, Skeleton, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Custumer = () => {
  /// dispatch
  const dispatch = useDispatch();

  /// data get
  const data = useSelector((store) => store.Castumer.data);
  useEffect(() => {
    dispatch(getCustumer());
  }, [dispatch]);
  const isLoading = useSelector((store) => store.Castumer.isLoading);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <div className="navbar flex items-center justify-between pb-[20px]">
        <h1 className="text-[20px] font-[600] lg:text-[25px]">Custumers</h1>
        <TextField label="Search User" />
      </div>
      <div className="p-[20px] grid md:grid-cols-2 lg:grid-cols-3 gap-[50px] xl:grid-cols-4">
        {isLoading
          ? skeleton.map((elem) => {
              return (
                <div key={elem}>
                  <Skeleton variant="circular" width={150} height={150} />
                  <Skeleton variant="text" width={150} height={20} />
                </div>
              );
            })
          : data?.map((elem) => {
              return (
                <Link
                  key={elem.userId}
                  to={`custumerById/${elem.userId}`}
                  onClick={() => dispatch(getCustumerById(elem.userId))}
                >
                  <div className="flex flex-col gap-[20px] items-start">
                    {elem.image.length == 0 || elem.image.length == null ? (
                      <Avatar sx={{ width: "150px", height: "150px" }} />
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_APP_FILES_URL}${
                          elem?.image
                        }`}
                        className="w-[150px] h-[150px] rounded-[50%]"
                        alt=""
                      />
                    )}
                    <h1 className="text-[20px] hover:underline">
                      {elem.userName}
                    </h1>
                  </div>
                </Link>
              );
            })}
      </div>
    </>
  );
};

export default Custumer;
