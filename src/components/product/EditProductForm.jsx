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
  name: z.string(),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  quantity: z.number().min(0, "Quantity must be greater than or equal to 0"),
});

const EditProductForm = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateData } = useUpdate();
  const { deleteData } = useDelete();
  const {
    data: product,
    loading: productLoading,
    error,
    getDataById,
  } = useFetchById();

  useEffect(() => {
    getDataById(id, "products");
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue("name", product.name);
    form.setValue("price", product.price);
    form.setValue("quantity", product.quantity);
  }, [product]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await updateData("products", id, values);
      toast.success("Product updated successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to update product");
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    console.log("delete");
    setLoading(true);
    try {
      deleteData("products", id);
      toast.success("Product deleted successfully");
      setLoading(false);
      navigate("/products");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to delete product");
      console.log(error);
    }
  };

  return (
    <>
      {product.name !== undefined ? (
        <Card className="space-y-1 flex flex-col lg:w-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl text-center tracking-wider">
              {product.name}
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Name: </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            label="name"
                            placeholder="Name"
                            disabled={loading}
                            {...field}
                            {...form.register("name")}
                            className="my-2 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="price">Price: </FormLabel>
                        <FormControl>
                          <Input
                            label="price"
                            type="number"
                            placeholder="Price"
                            disabled={loading}
                            {...field}
                            {...form.register("price", { valueAsNumber: true })}
                            className="my-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="quantity">Quantity: </FormLabel>
                        <FormControl>
                          <Input
                            label="quantity"
                            type="number"
                            placeholder="Quantity"
                            disabled={loading}
                            {...field}
                            {...form.register("quantity", {
                              valueAsNumber: true,
                            })}
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
            <DeleteDialog callback={deleteProduct} type={"product"} />
          </CardContent>
          <CardFooter className="flex flex-col"></CardFooter>
        </Card>
      ) : (
        <Loader2 size="50 " className="animate-spin m-4" />
      )}
    </>
  );
};

export default EditProductForm;
