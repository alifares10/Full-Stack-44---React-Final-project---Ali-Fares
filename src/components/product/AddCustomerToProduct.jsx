import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import useFetchAll from "@/hooks/useFetchAll ";
import useAdd from "@/hooks/useAdd";
import toast from "react-hot-toast";
import ProductsCombox from "../purchases/ProductsCombox";

const AddCustomerToProduct = ({ customer }) => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const { data: products, getData, loading } = useFetchAll();
  const { addToDatabase } = useAdd();
  const [value, setValue] = useState("");

  useEffect(() => {
    getData("products");
  }, []);

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
          <ProductsCombox products={products} callback={setValue} />
          <Button onClick={savePurchase}>Save</Button>
        </div>
      )}
    </>
  );
};

export default AddCustomerToProduct;
