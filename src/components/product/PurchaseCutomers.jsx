import AddCustomerToProduct from "./AddCustomerToProduct";
import { Link } from "react-router-dom";

const PurchaseCutomers = ({ product, purchases, customers, allProducts }) => {
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
    <div className="border border-slate-400 p-3 m-3 flex flex-col rounded-lg lg:w-[400px]">
      {uniquePurchases.length > 0 && (
        <>
          {filteredCustomers.map((customer, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center border-b-2 m-1 p-1 dark:border-white "
            >
              <Link
                to={`/customers/${customer?.id}`}
                className=" flex  font-bold "
              >
                <p className="flex mr-2">Customer Name:</p>
                <p className="flex hover:text-gray-500">
                  {customer?.firstName} {customer?.lastName}
                </p>
              </Link>
              {/* if the customer has bought the product more than one time*/}
              {filteredPurchases.map((purchase, index) => {
                if (purchase.CustomerID === customer.id) {
                  return (
                    <li className="p-1" key={index}>
                      Purchase Date:{" "}
                      {new Date(purchase.date).toLocaleDateString()}
                    </li>
                  );
                }
              })}

              <AddCustomerToProduct
                customer={customer}
                allProducts={allProducts}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PurchaseCutomers;
