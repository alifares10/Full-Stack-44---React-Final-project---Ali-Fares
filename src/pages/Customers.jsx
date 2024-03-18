import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import useAdd from "@/hooks/useAdd";
import useFetchAll from "@/hooks/useFetchAll ";
import React, { useEffect, useState, useMemo } from "react";
import CustomersTable from "@/components/customers/CustomersTable";
import BuyProducts from "@/components/customers/BuyProducts";

const Customers = () => {
  const {
    data: products,
    loading,
    error,
    getData: getProducts,
  } = useFetchAll();
  const { data: purchases, getData: getPurchases } = useFetchAll();
  const { data: customers, getData: getCustomers } = useFetchAll();
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    getProducts("products");
    getPurchases("purchases");
    getCustomers("customers");
  }, []);

  //combine customers with purchases and products
  const customersWithPurchases = useMemo(() => {
    console.log("useMemo");
    const res = customers.map((customer) => {
      const customerPurchases = purchases.filter(
        (purchase) => purchase.CustomerID === customer.id
      );
      const customerProducts = customerPurchases.map((purchase) =>
        products.find((product) => product.id === purchase.ProductID)
      );

      return {
        ...customer,
        products: customerProducts,
        purchases: customerPurchases,
      };
    });
    return res;
  }, [products, customers, purchases]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="justify-start flex items-center flex-col mx-auto h-fit min-h-screen p-4 space-y-3">
      <h1>Customers</h1>
      {products && customers && purchases && (
        <>
          <CustomersTable
            customers={customersWithPurchases}
            customer={""}
            product={""}
            select={setSelectedCustomer}
          />
          <BuyProducts
            products={products}
            selectedCustomer={selectedCustomer}
          />
        </>
      )}
    </div>
  );
};

export default Customers;
