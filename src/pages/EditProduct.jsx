import React from "react";
import EditProductForm from "@/components/product/EditProductForm";
import ProductCustomers from "@/components/product/ProductCustomers";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Unauthorized from "@/components/unauthorized";

const EditProduct = () => {
  const { id } = useParams();
  const reduxUser = useSelector((state) => state.user.user);

  if (reduxUser.role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <div className="justify-start flex items-center flex-col mx-auto h-fit min-h-screen p-4 w-screen">
      <EditProductForm id={id} />
      <ProductCustomers id={id} />
    </div>
  );
};

export default EditProduct;
