import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "/src/pages/Products/products";
import Other from "/src/pages/Other/other";
import Login from "./pages/login/login";
import AddProduct from "./pages/addProduct/addProduct";
import EditProduct from "./pages/editProduct/editProduct";

function App() {

  const token = localStorage.getItem("token");


  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Dashbord /> : <Navigate to="/login" replace />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/orders",
          element: <Orders />,
        }, 
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/other",
          element: <Other />,
        },
        {
          path: "/addProduct",
          element: <AddProduct />,
        },
        {
          path: "/editProduct/:id",
          element: <EditProduct />,
        },
      ],
    },
    {
      path: "/login",
      element: token ? <Navigate to="/dashboard" replace /> : <Login />,
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
