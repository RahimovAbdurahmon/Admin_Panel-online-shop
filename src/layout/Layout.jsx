import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  AccountCircle,
  AccountCircleOutlined,
  GridView,
  Inventory2,
  LogoutOutlined,
  MenuOpen,
  Notifications,
  PeopleAltOutlined,
  Search,
  // SettingsOutlined,
  ShoppingCartCheckoutOutlined,
  SignalCellularAlt,
} from "@mui/icons-material";
import { Link, Outlet, useLocation } from "react-router-dom";
import Switcher from "../components/Switcher/Switcher";
import { Tooltip } from "@mui/material";

import logo from "../assets/images/LOGO.png";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Layout = () => {
  /// pathname
  const { pathname } = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* navbar */}
        <AppBar position="fixed" open={open}>
          <Toolbar className="bg-white text-black">
            <div className="flex items-center justify-between w-[100%]">
              <div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Search sx={{ marginRight: "10px" }} />
                <input
                  type="text"
                  placeholder="Search"
                  className="border-hidden outline-none"
                />
              </div>
              <div className="flex items-center">
                <IconButton>
                  <Switcher />
                </IconButton>
                <Tooltip title="Natification">
                  <IconButton>
                    <Notifications sx={{ fontSize: "30px", color: "black" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Profile">
                  <IconButton>
                    <AccountCircle sx={{ fontSize: "30px", color: "black" }} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        {/* app bar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {/* drawer header */}
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "30px",
            }}
          >
            <img src={logo} className="w-[100px]" alt="" />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <MenuOpen /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Divider />
          <ul className="flex flex-col gap-[1px] p-[20px]">
            <Link to={"/dashboard"}>
              <li
                className={
                  pathname == "/dashboard"
                    ? "flex items-center gap-[15px] cursor-pointer p-[10px] hover:rounded-[10px] font-custom text-[20px] hover:bg-blue-100 border-r-[2px] bg-blue-50 border-r-blue-500"
                    : "flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom text-[20px] hover:bg-blue-100"
                }
              >
                <SignalCellularAlt />
                Dishboard
              </li>
            </Link>
            <Link to={"product"}>
              <li
                className={
                  pathname == "/dashboard/product"
                    ? "flex items-center gap-[15px] cursor-pointer p-[10px] hover:rounded-[10px] font-custom text-[20px] hover:bg-blue-100 border-r-[2px] bg-blue-50 border-r-blue-500"
                    : "flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom text-[20px] hover:bg-blue-100"
                }
              >
                <Inventory2 />
                Products
              </li>
            </Link>
            <Link to={"category"}>
              <li
                className={
                  pathname == "/dashboard/category"
                    ? "flex items-center gap-[15px] cursor-pointer p-[10px] hover:rounded-[10px] font-custom text-[20px] hover:bg-blue-100 border-r-[2px] bg-blue-50 border-r-blue-500"
                    : "flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom text-[20px] hover:bg-blue-100"
                }
              >
                <GridView />
                Category
              </li>
            </Link>
            <Link to={"brand"}>
              <li
                className={
                  pathname == "/dashboard/brand"
                    ? "flex items-center gap-[15px] cursor-pointer p-[10px] hover:rounded-[10px] font-custom text-[20px] hover:bg-blue-100 border-r-[2px] bg-blue-50 border-r-blue-500"
                    : "flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom text-[20px] hover:bg-blue-100"
                }
              >
                <ShoppingCartCheckoutOutlined />
                Brands
              </li>
            </Link>
            <Link to={"custumer"}>
              <li
                className={
                  pathname == "/dashboard/custumer"
                    ? "flex items-center gap-[15px] cursor-pointer p-[10px] hover:rounded-[10px] font-custom text-[20px] hover:bg-blue-100 border-r-[2px] bg-blue-50 border-r-blue-500"
                    : "flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom text-[20px] hover:bg-blue-100"
                }
              >
                <PeopleAltOutlined />
                Custumers
              </li>
            </Link>
            <Link to={"profile"}>
              <li
                className={
                  pathname == "/dashboard/profile"
                    ? "flex items-center gap-[15px] cursor-pointer p-[10px] hover:rounded-[10px] font-custom text-[20px] hover:bg-blue-100 border-r-[2px] bg-blue-50 border-r-blue-500"
                    : "flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom text-[20px] hover:bg-blue-100"
                }
              >
                <AccountCircleOutlined />
                Profile
              </li>
            </Link>
            <Link to={"/"}>
              <li className="flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom text-[20px] hover:bg-blue-100">
                <LogoutOutlined />
                Logout
              </li>
            </Link>
            {/* <Link to={"setting"}>
              <li
                className={
                  pathname == "/dashboard/setting"
                    ? "flex items-center gap-[15px] cursor-pointer p-[10px] hover:rounded-[10px] font-custom text-[20px] hover:bg-blue-100 border-r-[2px] bg-blue-50 border-r-blue-500"
                    : "flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom text-[20px] hover:bg-blue-100"
                }
              >
                <SettingsOutlined />
                Settings
              </li>
            </Link> */}
          </ul>
        </Drawer>
        {/* outlet */}
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </>
  );
};

export default Layout;
