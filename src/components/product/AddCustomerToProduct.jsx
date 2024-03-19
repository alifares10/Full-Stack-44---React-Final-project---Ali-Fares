import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import useAdd from "@/hooks/useAdd";
import toast from "react-hot-toast";
import ProductsCombox from "../purchases/ProductsCombox";

const AddCustomerToProduct = ({ customer, allProducts }) => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const { addToDatabase } = useAdd();
  const [value, setValue] = useState("");

  const savePurchase = async () => {
    if (!value) {
      toast.error("Please select a product");
      return;
    }
    const purchaseData = {
      CustomerID: customer.id,
      ProductID: value,
      date: new Date().toISOString(),
    };
    await addToDatabase("purchases", purchaseData);
    toast.success("Purchase saved");
  };

  return (
    <>
      <Button
        onClick={() => setShowAddCustomer((prevData) => !prevData)}
        className="m-2 flex lg:w-[200px]"
      >
        {showAddCustomer ? "Close" : "Add"}
      </Button>
      {showAddCustomer && (
        <div className="flex flex-col">
          <ProductsCombox products={allProducts} callback={setValue} />
          <Button onClick={savePurchase}>Save</Button>
        </div>
      )}
    </>
  );
};

export default AddCustomerToProduct;
