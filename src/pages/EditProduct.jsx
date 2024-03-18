import React from "react";
import EditProductForm from "@/components/product/EditProductForm";
import ProductCustomers from "@/components/product/ProductCustomers";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();

  return (
    <div className="justify-start flex items-center flex-col mx-auto h-fit min-h-screen p-4">
      <EditProductForm id={id} />
      <ProductCustomers id={id} />
    </div>
  );
};

export default EditProduct;
