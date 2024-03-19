import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import useFetchAll from "@/hooks/useFetchAll ";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCustomers = ({ id }) => {
  const { data: customers, loading, error, getData } = useFetchAll();
  const { data: purchases, getData: getPurchase } = useFetchAll();

  useEffect(() => {
    getData("customers");
    getPurchase("purchases");
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredPurchases = purchases.filter(
    (purchase) => purchase.ProductID === id
  );
  const filteredCustomers = customers.filter((customer) => {
    return filteredPurchases
      .map((purchase) => purchase.CustomerID)
      .includes(customer.id);
  });

  return (
    <>
      {filteredCustomers && (
        <Card className="space-y-1 flex flex-col lg:w-[600px] m-3">
          <CardHeader>
            <CardTitle className="tracking-wide">
              Customer Who Purchased This Product
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-4">
            {filteredCustomers.map((customer) => (
              <li key={customer.id}>
                <Link
                  to={`/customers/${customer.id}`}
                  className="font-bold  hover:text-gray-500"
                >
                  {customer.firstName} {customer.lastName}
                </Link>
              </li>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProductCustomers;
