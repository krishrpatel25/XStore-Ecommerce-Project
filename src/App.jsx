import React from "react";
import { CartsProvider } from "./context/CartsContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/root/HomePage";
import ViewProductPage from "./pages/view-product/ViewProductPage";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./pages/category/CategoryPage";
import AllProductsPage from "./pages/all-products/AllProductsPage";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--secondary)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "2px solid var(--primary)",
            borderRadius: "18px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            padding: "16px 20px",
            color: "var(--accent)",
            fontWeight: "600",
            letterSpacing: "0.2px",
            opacity: "0.92",
          },
        }}
      />

      <RouterProvider router={router}></RouterProvider>
    </>
  );
 
}

export default App;
