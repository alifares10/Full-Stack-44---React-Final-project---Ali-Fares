import { Check, ChevronsUpDown, X } from "lucide-react";
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
import { useEffect, useState } from "react";

const CustomersCombox = ({ customers, callback }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    callback(value);
  }, [value]);

  const reset = (e) => {
    e.stopPropagation();
    setValue("");
  };

  return (
    <>
      {customers.length > 0 && (
        <div className="flex flex-col p-3 space-y-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value ? (
                  <div className="flex justify-between items-center w-full ">
                    {customers.find((customer) => customer.id === value)
                      ?.firstName +
                      " " +
                      customers.find((customer) => customer.id === value)
                        ?.lastName}
                    <X
                      className="relative hover:bg-black rounded-md transition-all"
                      onClick={reset}
                    />
                  </div>
                ) : (
                  "Select Customer"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No Customers Found</CommandEmpty>
                  <CommandGroup>
                    {customers.map((customer) => (
                      <CommandItem
                        key={customer.id}
                        value={customer.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        className="font-semibold"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === customer.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {customer.firstName} {customer.lastName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
};

export default CustomersCombox;
