import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const EditProduct = () => {
  const params = useParams();
  console.log(params);
  return <div>EditProduct </div>;
};

export default EditProduct;
