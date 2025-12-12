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
import CheckoutForm from "./pages/checkout-form/CheckoutForm";
import WishList from "./pages/wishlist/WishList";
import { WishListProvider } from "./context/WishListContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = new createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "allproducts", element: <AllProductsPage /> },
      { path: "product/:id", element: <ViewProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "category", element: <CategoryPage /> },
      { path: "checkoutform", element: <CheckoutForm /> },
      { path: "wishlist", element: <WishList /> },
    ],
  },
]);

function App() {
  return (
    // add cartsProvider
    <>
      <QueryClientProvider client={queryClient}>
        <CartsProvider>
          <WishListProvider>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(15px) saturate(150%)",
                  WebkitBackdropFilter: "blur(15px) saturate(150%)",
                  borderRadius: "18px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  padding: "16px 20px",
                  color: "var(--accent)",
                  fontWeight: "600",
                  letterSpacing: "0.2px",
                  border: "2px solid var(--background)",
                },
              }}
            />
            <RouterProvider router={router} />
          </WishListProvider>
        </CartsProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
