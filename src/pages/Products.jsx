import React, { useEffect, useState } from "react";
import useFetchAll from "../hooks/useFetchAll ";
import useFetchById from "../hooks/useFetchById";
import useAdd from "../hooks/useAdd";
import useUpdate from "../hooks/useUpdate";
import useDelete from "../hooks/useDelete";
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
  const { updateData } = useUpdate();
  const { deleteData } = useDelete();

  useEffect(() => {
    getProducts("products");
    getPurchases("purchases");
    getCustomers("customers");
  }, []);

  const addProduct = async () => {
    const product = {
      name: "Product 4",
      price: 100,
      quantity: 1,
    };
    await addToDatabase("products", product);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="justify-start flex items-center flex-col mx-auto h-fit min-h-screen p-4">
      <h1>products</h1>
      <Button onClick={addProduct}>Add Product</Button>
      <PurchasedAmount />

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                purchases={purchases}
                customers={customers}
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
