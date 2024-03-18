import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import useAdd from "@/hooks/useAdd";
import toast from "react-hot-toast";
import ProductsCombox from "../purchases/ProductsCombox";

const BuyProducts = ({ products, selectedCustomer }) => {
  const [showBuyProduct, setShowBuyProduct] = useState(false);
  const [value, setValue] = useState("");
  const { addToDatabase } = useAdd();

  const buyProduct = async () => {
    if (selectedCustomer === "") {
      return toast.error("Please select a customer");
    }
    if (value === "") {
      return toast.error("Please select a product");
    }
    const purchase = {
      CustomerID: selectedCustomer,
      ProductID: value,
      date: new Date().toISOString(),
    };
    await addToDatabase("purchases", purchase);
    toast.success("Product Purchased");
  };

  return (
    <>
      <Button
        onClick={() => setShowBuyProduct((prevData) => !prevData)}
        className="m-4 p-3 flex lg:w-[200px]"
      >
        {showBuyProduct ? "Close" : "Buy Product"}
      </Button>
      {showBuyProduct && (
        <div className="flex flex-col">
          <ProductsCombox products={products} callback={setValue} />
          <Button onClick={buyProduct}>Buy</Button>
        </div>
      )}
    </>
  );
};

export default BuyProducts;
