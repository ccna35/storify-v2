import { HomePage, Profile, Settings } from "./pages";
import NewProduct from "./pages/NewProduct";
import NewProductTest from "./pages/NewProductTest";
import Product from "./pages/Product";
import Products from "./pages/Products";

export const PRIVATE_ROUTES = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <Product />,
  },
  {
    path: "/new-product",
    element: <NewProduct />,
  },
];

// export const PUBLIC_ROUTES = [
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ];
