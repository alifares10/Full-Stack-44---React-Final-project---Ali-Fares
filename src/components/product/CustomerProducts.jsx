import { Button } from "../ui/Button";
import useAdd from "@/hooks/useAdd";
import useFetchAll from "@/hooks/useFetchAll ";
import { useEffect, useMemo, useState } from "react";
import AddCustomerToProduct from "./AddCustomerToProduct";

const CustomerProducts = ({ product, purchases, customers }) => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const { addToDatabase } = useAdd();

  // const handleClick = async () => {
  //   const randomCustomer =
  //     customers[Math.floor(Math.random() * customers.length)];

  //   const purchase = {
  //     CustomerID: randomCustomer.id,
  //     ProductID: product.id,
  //     date: new Date().toISOString(),
  //   };
  //   await addToDatabase("purchases", purchase);
  // };
  // const addcustomer = async () => {
  //   const customer = {
  //     firstName: "charley",
  //     lastName: "brown",
  //     City: "New York",
  //   };
  //   await addToDatabase("customers", customer);
  // };

  const filteredPurchases = purchases.filter(
    (purchase) => purchase.ProductID === product.id
  );

  // remove purchases that have the same customer id
  const seen = new Set();
  const uniquePurchases = filteredPurchases.filter((purchase) => {
    const duplicate = seen.has(purchase.CustomerID);
    seen.add(purchase.CustomerID);
    return !duplicate;
  });

  const filteredCustomers = uniquePurchases.map((purchase) => {
    return customers.find((customer) => customer.id === purchase.CustomerID);
  });

  return (
    <div className="border border-slate-400 p-3 m-3 flex flex-col">
      {uniquePurchases.length > 0 && (
        <>
          {filteredCustomers.map((customer, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center border-b-2 m-1 p-1 dark:border-white"
            >
              <p>
                Customer Name: {customer?.firstName} {customer?.lastName}
              </p>
              {/* if the customer has bought the product more than one time*/}
              {filteredPurchases.map((purchase, index) => {
                if (purchase.CustomerID === customer.id) {
                  return <p key={index}>Date: {purchase.date}</p>;
                }
              })}

              <Button
                onClick={() => setShowAddCustomer((prevData) => !prevData)}
                className="m-2 flex lg:w-[200px]"
              >
                Add
              </Button>
              {showAddCustomer && <AddCustomerToProduct customer={customer} />}
            </div>
          ))}
        </>
      )}
      {/* <Button onClick={handleClick}>Buy</Button> */}
    </div>
  );
};

export default CustomerProducts;
