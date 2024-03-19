import React, { useEffect, useState } from "react";
import useFetchAll from "../hooks/useFetchAll ";
import useAdd from "../hooks/useAdd";
import { Button } from "@/components/ui/Button";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import PurchasedAmount from "@/components/product/PurchasedAmount";
import ProductCard from "@/components/product/ProductCard";
import { Loader2 } from "lucide-react";

const Products = () => {
  const {
    data: products,
    loading,
    error,
    getData: getProducts,
  } = useFetchAll();
  const { data: purchases, getData: getPurchases } = useFetchAll();
  const { data: customers, getData: getCustomers } = useFetchAll();
  const { addToDatabase } = useAdd();

  useEffect(() => {
    getProducts("products");
    getPurchases("purchases");
    getCustomers("customers");
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="justify-start flex items-center flex-col mx-auto h-fit min-h-screen p-4 max-w-[100wv] w-screen ">
      <PurchasedAmount />
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 ">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                purchases={purchases}
                customers={customers}
                allProducts={products}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {!products ? (
            <h1> no products found </h1>
          ) : (
            <Loader2 size="50 " className="animate-spin  m-3" />
          )}
        </>
      )}
    </div>
  );
};

export default Products;
