import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomerProducts from "./CustomerProducts";
import { Link } from "react-router-dom";

const ProductCard = ({ product, purchases, customers }) => {
  return (
    <Card
      className="lg:w-[500px] h-fit justify-center items-center text-center p-2 m-3 dark:hover:bg-slate-800
                     hover:bg-slate-300 bg-primary-foreground transition-all"
    >
      {product && purchases && (
        <>
          <CardHeader>
            <CardTitle>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="justify-center items-center text-center">
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <CustomerProducts
              product={product}
              purchases={purchases}
              customers={customers}
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default ProductCard;