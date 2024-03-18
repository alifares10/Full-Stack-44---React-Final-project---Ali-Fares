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

const CustomerPurchases = ({ id }) => {
  const { data: products, loading, error, getData } = useFetchAll();
  const { data: purchases, getData: getPurchase } = useFetchAll();

  useEffect(() => {
    getData("products");
    getPurchase("purchases");
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredPurchases = purchases.filter(
    (purchase) => purchase.CustomerID === id
  );
  const filteredProducts = products.filter((product) =>
    filteredPurchases.map((purchase) => purchase.ProductID).includes(product.id)
  );

  return (
    <>
      {filteredPurchases && (
        <Card className="space-y-1 flex flex-col lg:w-[600px]  m-3">
          <CardHeader>
            <CardTitle className="tracking-wide">
              Products That The Customer Purchased
            </CardTitle>
          </CardHeader>
          <CardContent className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="font-bold  hover:text-gray-500"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CustomerPurchases;
