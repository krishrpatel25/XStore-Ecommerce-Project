import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";

import HomePage from "./pages/root/HomePage";
import ViewProductPage from "./pages/view-product/ViewProductPage";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./pages/category/CategoryPage";
import AllProductsPage from "./pages/all-products/AllProductsPage";
import CheckoutForm from "./pages/checkout-form/CheckoutForm";
import WishList from "./pages/wishlist/WishList";
import OrderPage from "./pages/order/OrderPage";
import ViewOrderPage from "./pages/view-order/ViewOrderPage";
import ProfilePage from "./pages/profile/ProfilePage";

import { Toaster } from "sonner";
import { CartsProvider } from "./context/CartsContext";
import { WishListProvider } from "./context/WishListContext";
import { OrdersProvider } from "./context/OrdersContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "allproducts", element: <AllProductsPage /> },
      { path: "product/:id", element: <ViewProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "category", element: <CategoryPage /> },
      { path: "checkoutform", element: <CheckoutForm /> },
      { path: "wishlist", element: <WishList /> },
      { path: "order", element: <OrderPage /> },
      { path: "order/:orderId", element: <ViewOrderPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartsProvider>
        <OrdersProvider>
          <WishListProvider>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  borderRadius: "0px",
                  background: "var(--secondary)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                  boxShadow: "5px 5px 0px 0px var(--primary)",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: "800",
                  padding: "14px 22px",
                  minWidth: "280px",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "var(--primary)",
                    secondary: "var(--secondary)",
                  },
                },
                error: {
                  style: {
                    background: "#000000",
                    color: "#ff4b4b",
                    border: "1px solid #ff4b4b",
                    boxShadow: "5px 5px 0px 0px #ff4b4b",
                  },
                },
              }}
            />

            <RouterProvider router={router} />
          </WishListProvider>
        </OrdersProvider>
      </CartsProvider>
    </QueryClientProvider>
  );
}

export default App;
