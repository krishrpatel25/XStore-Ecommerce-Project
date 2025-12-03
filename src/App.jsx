import React from "react";
import { CartsProvider } from "./context/CartsContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/root/HomePage";
import ViewProductPage from "./pages/view-product/ViewProductPage";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./pages/category/CategoryPage";
import AllProductsPage from "./pages/all-products/AllProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "allproducts", element: <AllProductsPage /> },
      { path: "product/:id", element: <ViewProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "category", element: <CategoryPage /> },
    ],
  },
]);

function App() {
  return (

    // add cartsProvider 
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
 
}

export default App;
