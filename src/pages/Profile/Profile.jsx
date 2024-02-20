import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getProfileById } from "../../api/Profile/ProfileApi";
import { getToken } from "../../utils/token";
import { Avatar, Button, Skeleton, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getCustumer } from "../../api/Castumer/CastumerApi";
import { Close, Delete, Edit } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import {
  setDialogEditProfile,
  setInpEditEmailProfile,
  setInpEditFirstNameProfile,
  setInpEditImgProfile,
  setInpEditLastNameProfile,
  setInpEditPhoneProfile,
} from "../../reducers/Profile/Profile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  /// dialog and state
  const dialogEditProfile = useSelector(
    (store) => store.Profile.dialogEditProfile
  );
  const inpEditImgProfile = useSelector(
    (store) => store.Profile.inpEditImgProfile
  );
  const inpEditFirstNameProfile = useSelector(
    (store) => store.Profile.inpEditFirstNameProfile
  );
  const inpEditLastNameProfile = useSelector(
    (store) => store.Profile.inpEditLastNameProfile
  );
  const inpEditEmailProfile = useSelector(
    (store) => store.Profile.inpEditEmailProfile
  );
  const inpEditPhoneProfile = useSelector(
    (store) => store.Profile.inpEditPhoneProfile
  );

  /// dialog edit
  function handleOpenDialogProfile(user) {
    dispatch(setDialogEditProfile());
    setInpEditImgProfile(user.image);
    dispatch(setInpEditFirstNameProfile(user.firstName));
    dispatch(setInpEditLastNameProfile(user.lastName));
    dispatch(setInpEditEmailProfile(user.email));
    dispatch(setInpEditPhoneProfile(user.phoneNumber));
  }

  /// dispatch
  const dispatch = useDispatch();

  /// modal
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /// token
  let userId = getToken().sid;

  /// profile  about
  const profile = useSelector((store) => store.Profile.profile);
  useEffect(() => {
    dispatch(getProfileById(userId));
  }, [dispatch]);
  const data = useSelector((store) => store.Castumer.data);
  useEffect(() => {
    dispatch(getCustumer());
  }, [dispatch]);
  const isLoading = useSelector((store) => store.Castumer.isLoading);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  /// edit
  const handleSubmitEditProfile = (event) => {
    event.preventDefault();
    let newEditProfile = new FormData();
    newEditProfile.append("Image", event.target.image.files[0]);
    newEditProfile.append("FirstName", inpEditFirstNameProfile);
    newEditProfile.append("LastName", inpEditLastNameProfile);
    newEditProfile.append("Email", inpEditEmailProfile);
    newEditProfile.append("PhoneNumber", inpEditPhoneProfile);
    newEditProfile.append("Dob", profile.dob);
    dispatch(editProfile(newEditProfile));
    dispatch(setDialogEditProfile());
  };

  return (
    <>
      <div className="flex items-center justify-between p-[20px] py-[10px] bg-gray-100 rounded-[10px]">
        <h1 className="text-[20px] font-[600] text-end p-[20px]">Profile</h1>
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      </div>
      <div className="flex items-start justify-between p-[50px]">
        <div className="flex flex-col gap-[100px] items-start">
          <div className="flex items-start gap-[50px]">
            {profile?.image?.length == 0 || profile?.image?.length == null ? (
              <Avatar sx={{ width: "150px", height: "150px" }} />
            ) : (
              <img
                src={`${import.meta.env.VITE_APP_FILES_URL}${profile?.image}`}
                className="w-[200px] h-[200px] rounded-[50%]"
                alt=""
              />
            )}
            <div className="flex items-start flex-col gap-[50px] py-[30px]">
              <h1 className="text-[30px] font-[600]">{profile?.userName}</h1>
              <div className="flex gap-[20px]">
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleOpenDialogProfile(profile)}
                >
                  Edit
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Accordion sx={{ width: "500px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Show Users
              </AccordionSummary>
              <AccordionDetails className="flex flex-col gap-[5px]">
                {isLoading
                  ? skeleton.map((elem) => {
                      return (
                        <div key={elem}>
                          <Skeleton
                            variant="circular"
                            width={150}
                            height={150}
                          />
                          <Skeleton variant="text" width={150} height={20} />
                        </div>
                      );
                    })
                  : data?.map((elem) => {
                      return (
                        <div
                          key={elem.userId}
                          className="flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex items-center gap-[10px]">
                            {elem.image.length == 0 ||
                            elem.image.length == null ? (
                              <Avatar sx={{ width: "50px", height: "50px" }} />
                            ) : (
                              <img
                                src={`${import.meta.env.VITE_APP_FILES_URL}${
                                  elem?.image
                                }`}
                                className="w-[50px] h-[50px] rounded-[50%]"
                                alt=""
                              />
                            )}
                            <h1 className="text-[20px]">{elem.userName}</h1>
                          </div>
                          <div className="flex items-center gap-[10px]">
                            <IconButton color="error">
                              <Delete />
                            </IconButton>
                            <IconButton color="info">
                              <Edit />
                            </IconButton>
                          </div>
                        </div>
                      );
                    })}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="p-[30px] bg-blue-50 rounded-[10px] lg:w-[550px]">
          <ul className="flex flex-col gap-[25px] items-center w-[100%]">
            <li className="w-[100%] flex items-center justify-between">
              <span className="text-[18px] text-gray-500">User Name :</span>
              <span className="text-[20px] font-[600]">
                {profile?.userName}
              </span>
            </li>
            <li className="w-[100%] flex items-center justify-between">
              <span className="text-[18px] text-gray-500">First Name :</span>
              <span className="text-[20px] font-[600]">
                {profile?.firstName}
              </span>
            </li>
            <li className="w-[100%] flex items-center justify-between">
              <span className="text-[18px] text-gray-500">Last Name :</span>
              <span className="text-[20px] font-[600]">
                {profile?.lastName}
              </span>
            </li>
            <li className="w-[100%] flex items-center justify-between">
              <span className="text-[18px] text-gray-500">Full Name :</span>
              <span className="text-[20px] font-[600]">
                {profile?.lastName} {profile?.firstName}
              </span>
            </li>
            <li className="w-[100%] flex items-center justify-between">
              <span className="text-[18px] text-gray-500">Email :</span>
              <span className="text-[20px] font-[600]">{profile?.email}</span>
            </li>
            <li className="w-[100%] flex items-center justify-between">
              <span className="text-[18px] text-gray-500">Phone Number :</span>
              <span className="text-[20px] font-[600]">
                {profile?.phoneNumber}
              </span>
            </li>
            <li className="w-[100%] flex items-center justify-between">
              <span className="text-[18px] text-gray-500">Data Join :</span>
              <span className="text-[20px] font-[600]">{profile?.dob}</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Modal
          open={dialogEditProfile}
          onClose={() => dispatch(setDialogEditProfile())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex items-center justify-between pb-[20px]">
              <p className="text-[18px] font-[500]">Edit Profile</p>
              <IconButton onClick={() => dispatch(setDialogEditProfile())}>
                <Close />
              </IconButton>
            </div>
            <form
              onSubmit={(event) => handleSubmitEditProfile(event)}
              className="flex items-end flex-col gap-[15px]"
            >
              <TextField
                type="file"
                className="image"
                name="image"
                id="image"
                value={inpEditImgProfile}
                onChange={(event) =>
                  dispatch(setInpEditImgProfile(event.target.value))
                }
                required
                fullWidth
              />
              <TextField
                type="text"
                className="firstName"
                label="First Name"
                name="firstName"
                id="firstName"
                value={inpEditFirstNameProfile}
                onChange={(event) =>
                  dispatch(setInpEditFirstNameProfile(event.target.value))
                }
                required
                fullWidth
              />
              <TextField
                type="text"
                className="lastName"
                label="Last Name"
                name="lastName"
                id="lastName"
                value={inpEditLastNameProfile}
                onChange={(event) =>
                  dispatch(setInpEditLastNameProfile(event.target.value))
                }
                required
                fullWidth
              />
              <TextField
                type="text"
                className="email"
                label="Email"
                name="email"
                id="email"
                value={inpEditEmailProfile}
                onChange={(event) =>
                  dispatch(setInpEditEmailProfile(event.target.value))
                }
                required
                fullWidth
              />
              <TextField
                type="text"
                className="phone"
                label="Phone"
                name="phone"
                id="phone"
                value={inpEditPhoneProfile}
                onChange={(event) =>
                  dispatch(setInpEditPhoneProfile(event.target.value))
                }
                required
                fullWidth
              />
              <div className="flex gap-[15px]">
                <Button
                  variant="outlined"
                  onClick={() => dispatch(setDialogEditProfile())}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Edit
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
