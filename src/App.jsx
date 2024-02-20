import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Custumer from "./pages/Custumer/Custumer";
import Profile from "./pages/Profile/Profile";
import Setting from "./pages/Setting/Setting";
import Category from "./pages/Category/Category";
import CategoryById from "./pages/CategoryById/CategoryById";
import Brand from "./pages/Brand/Brand";
import BrandById from "./pages/BrandById/BrandById";
import CustumerById from "./pages/CustumerById/CustumerById";

const App = () => {
  /// navigate
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "dashboard",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "categoryById",
          element: <CategoryById />,
        },
        {
          path: "brand",
          element: <Brand />,
        },
        {
          path: "brand/brandById/:id",
          element: <BrandById />,
        },
        {
          path: "custumer",
          element: <Custumer />,
        },
        {
          path: "custumer/custumerById/:id", 
          element: <CustumerById />
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
