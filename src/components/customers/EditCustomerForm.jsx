import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchById from "@/hooks/useFetchById";
import { Loader2 } from "lucide-react";
import useUpdate from "@/hooks/useUpdate";
import useDelete from "@/hooks/useDelete";
import DeleteDialog from "../ui/deleteDialog";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  City: z.string(),
});

const EditCustomerForm = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateData } = useUpdate();
  const { deleteData } = useDelete();
  const {
    data: customer,
    loading: customerLoading,
    error,
    getDataById,
  } = useFetchById();

  useEffect(() => {
    getDataById(id, "customers");
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue("firstName", customer.firstName);
    form.setValue("lastName", customer.lastName);
    form.setValue("City", customer.City);
  }, [customer]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await updateData("customers", id, values);
      toast.success("customer updated successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to update customer");
      setLoading(false);
    }
  };

  const deleteCustomer = async () => {
    setLoading(true);
    try {
      deleteData("customers", id);
      toast.success("customer deleted successfully");
      setLoading(false);
      navigate("/customers");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to delete customer");
      console.log(error);
    }
  };

  return (
    <>
      {customer.firstName !== undefined ? (
        <Card className="space-y-1 flex flex-col lg:w-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl text-center tracking-wider">
              {customer.firstName} {customer.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 w-full py-5"
              >
                <div className="md:grid md:grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="firstName">First Name: </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            label="firstName"
                            placeholder="First Name"
                            disabled={loading}
                            {...field}
                            {...form.register("firstName")}
                            className="my-2 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="lastName">Last Name: </FormLabel>
                        <FormControl>
                          <Input
                            label="lastName"
                            type="text"
                            placeholder="Last Name"
                            disabled={loading}
                            {...field}
                            {...form.register("lastName")}
                            className="my-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="City"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="city">City: </FormLabel>
                        <FormControl>
                          <Input
                            label="city"
                            type="text"
                            placeholder="City"
                            disabled={loading}
                            {...field}
                            {...form.register("City")}
                            className="my-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full hover:bg-gray-800">
                  {loading ? (
                    <Loader2 size="50 " className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </form>
            </Form>
            <DeleteDialog callback={deleteCustomer} type={"customer"} />
          </CardContent>
          <CardFooter className="flex flex-col"></CardFooter>
        </Card>
      ) : (
        <Loader2 size="50 " className="animate-spin m-4" />
      )}
    </>
  );
};

export default EditCustomerForm;
