import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useFetchAll from "@/hooks/useFetchAll ";
import useAdd from "@/hooks/useAdd";
import toast from "react-hot-toast";

const AddCustomerCombox = ({ customer }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { data: allProducs, getData, loading } = useFetchAll();
  const { addToDatabase } = useAdd();
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  useEffect(() => {
    getData("products");
  }, []);

  const savePurchase = async () => {
    if (!value) {
      toast.error("Please select a product");
      return;
    }
    const purchaseData = {
      CustomerID: customer.id,
      ProductID: value,
      date: new Date().toISOString(),
    };
    await addToDatabase("purchases", purchaseData);
  };

  return (
    <>
      {allProducs.length > 0 && (
        <div className="flex flex-col p-3 space-y-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? allProducs.find((product) => product.id === value)?.name
                  : "Select Product"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No Products Found</CommandEmpty>
                  <CommandGroup>
                    {allProducs.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        className="font-semibold"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === product.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {product.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button onClick={savePurchase}>Save</Button>
        </div>
      )}
    </>
  );
};

const AddCustomerToProduct = ({ customer }) => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowAddCustomer((prevData) => !prevData)}
        className="m-2 flex lg:w-[200px]"
      >
        {showAddCustomer ? "Close" : "Add"}
      </Button>
      {showAddCustomer && <AddCustomerCombox customer={customer} />}
    </>
  );
};

export default AddCustomerToProduct;
