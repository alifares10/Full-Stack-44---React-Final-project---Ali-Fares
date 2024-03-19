import React from "react";
import { useParams } from "react-router-dom";
import EditCustomerForm from "@/components/customers/EditCustomerForm";
import CustomerPurchases from "@/components/customers/CustomerPurchases";
import { useSelector } from "react-redux";
import Unauthorized from "@/components/unauthorized";

const EditCustomer = () => {
  const { id } = useParams();
  const reduxUser = useSelector((state) => state.user.user);

  if (reduxUser.role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <div className="justify-start flex items-center flex-col mx-auto h-fit min-h-screen p-4 w-screen">
      <EditCustomerForm id={id} />
      <CustomerPurchases id={id} />
    </div>
  );
};

export default EditCustomer;
