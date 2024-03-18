import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import CustomersTable from "../customers/CustomersTable";

const SearchPuchase = ({ date, customers, customer, product, reset }) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <div className="flex justify-center ">
        <Button onClick={() => setShowTable(true)} className="mx-2">
          Search
        </Button>
        <Button onClick={() => setShowTable(false)} className="mx-2">
          Close
        </Button>
      </div>
      {showTable && (
        <CustomersTable
          customers={customers}
          customer={customer}
          product={product}
          select={() => {}}
        />
      )}
    </>
  );
};

export default SearchPuchase;
