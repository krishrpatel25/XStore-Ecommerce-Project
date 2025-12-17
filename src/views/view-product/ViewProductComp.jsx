import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailContent from "./ProductDetailContent";
import ProductAditionalInfo from "./ProductAditionalInfo";
import ProductNotFound from "./ProductNotFound";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductLoader from "@/components/ui/ProductLoader";
import GoBackButton from "@/components/ui/GoBackButton";

function ViewProductComp() {
  const { id } = useParams();
  const { pathname } = useLocation();
  
  //---for top scroll ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const fetchSingleProductData = async (id) => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    console.log("View product", res);
    return res.data;
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchSingleProductData(id),
  });

  if (isLoading) {
    return <ProductLoader />;
  }

  return (
    <>
      <div className="p-4 md:p-16 ">
        <GoBackButton to="/allproducts" className="pt-20 md:px-10 " />
        {products ? (
          <>
            <ProductDetailContent products={products} />
            {/* details section  */}
            <ProductAditionalInfo products={products} />
          </>
        ) : (
          <ProductNotFound />
        )}
      </div>
    </>
  );
}

export default ViewProductComp;
