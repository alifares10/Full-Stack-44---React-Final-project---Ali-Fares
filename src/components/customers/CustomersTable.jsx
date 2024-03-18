import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2Icon } from "lucide-react";

const CustomersTable = ({ customers, customer, product, select }) => {
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  //filter customers by the provided product and customer
  useEffect(() => {
    if (product !== "" && customer !== "") {
      const filterByProducts = customers.filter((customer) => {
        return customer.products.find((pro) => pro.id === product);
      });
      const filterByCustomer = filterByProducts.filter(
        (cust) => cust.id === customer
      );
      setFilteredCustomers(filterByCustomer);
    } else if (product === "" && customer !== "") {
      const filterByCustomer = customers.filter((cust) => cust.id === customer);
      setFilteredCustomers(filterByCustomer);
    } else if (product !== "" && customer === "") {
      const filterByProducts = customers.filter((customer) => {
        return customer.products.find((pro) => pro.id === product);
      });
      setFilteredCustomers(filterByProducts);
    } else {
      setFilteredCustomers(customers);
    }
  }, [product, customer, customers]);

  const handleSelect = (id) => {
    select(id === selectedCustomer ? "" : id);
    setSelectedCustomer((prev) => (prev === id ? "" : id));
  };

  return (
    filteredCustomers.length > 0 && (
      <>
        <Table className="border mt-4 max-w-full ">
          <TableHeader className="">
            <TableRow className="font-extrabold">
              <TableHead className="font-bold border">Name</TableHead>
              <TableHead className=" font-bold">Products</TableHead>
              <TableHead className="border font-bold">Purchase Dates</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                className={`cursor-pointer ${
                  selectedCustomer === customer.id
                    ? "bg-primary-foreground"
                    : ""
                }`}
                onClick={() => handleSelect(customer.id)}
              >
                <TableCell className="font-medium border">
                  <div className="flex ">
                    {selectedCustomer === customer.id && (
                      <CheckCircle2Icon className="mx-1" />
                    )}
                    <p>
                      {customer.firstName} {customer.lastName}
                    </p>
                  </div>
                </TableCell>
                <TableCell className=" ">
                  {customer.products.length > 0
                    ? customer.products.map((product, index) => (
                        <li key={index}>
                          <Link
                            to={`/products/${product.id}`}
                            className="hover:text-slate-400 hover:underline"
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))
                    : "No Products Purchased"}
                </TableCell>
                <TableCell className=" border">
                  {customer.purchases.length > 0
                    ? customer.purchases.map((purchase) => (
                        <li key={purchase.id}>
                          <p>{new Date(purchase.date).toLocaleDateString()}</p>
                        </li>
                      ))
                    : "No Purchases"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  );
};

export default CustomersTable;
