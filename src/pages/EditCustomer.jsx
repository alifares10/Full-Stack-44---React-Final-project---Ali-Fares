import React from "react";
import { useParams } from "react-router-dom";
import EditCustomerForm from "@/components/customers/EditCustomerForm";
import CustomerPurchases from "@/components/customers/CustomerPurchases";

const EditCustomer = () => {
  const { id } = useParams();
  return (
    <div className="justify-start flex items-center flex-col mx-auto h-fit min-h-screen p-4">
      <EditCustomerForm id={id} />
      <CustomerPurchases id={id} />
    </div>
  );
};

export default EditCustomer;
