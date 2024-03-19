import React, { useEffect, useState } from "react";
import ProductsCombox from "@/components/purchases/ProductsCombox";
import CustomersCombox from "@/components/purchases/CustomersCombox";
import useFetchAll from "@/hooks/useFetchAll ";
import { Loader2 } from "lucide-react";
import DatePicker from "@/components/purchases/DatePicker";
import SearchPuchase from "@/components/purchases/SearchPuchase";

const Purchases = () => {
  const { data: products, getData } = useFetchAll();
  const { data: customers, getData: getCustomers } = useFetchAll();
  const { data: purchases, getData: getPurchases } = useFetchAll();
  const [date, setDate] = useState();
  const [customer, setCustomer] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    getData("products");
    getCustomers("customers");
    getPurchases("purchases");
  }, []);

  const handleDate = (date) => {
    setDate(date);
  };

  //combine customers with purchases and products
  const customersWithPurchases = customers.map((customer) => {
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

  return (
    <div className="justify-start flex items-center flex-col mx-auto h-fit min-h-screen p-4 space-y-3 w-screen">
      <h1>Purchases</h1>
      {customers !== undefined && products !== undefined ? (
        <div className="flex flex-col justify-center">
          <div className="flex justify-center items-center m-3">
            <ProductsCombox products={products} callback={setProduct} />
            <CustomersCombox customers={customers} callback={setCustomer} />
            <DatePicker callback={handleDate} />
          </div>
          <div className="items-center justify-center flex flex-col m03">
            <SearchPuchase
              date={date}
              customers={customersWithPurchases}
              customer={customer}
              product={product}
            />
          </div>
        </div>
      ) : (
        <Loader2 className="animate-spin" size={24} />
      )}
    </div>
  );
};

export default Purchases;
