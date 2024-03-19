import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAdd from "@/hooks/useAdd";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  role: z.enum(["user", "admin"]),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addToDatabase } = useAdd();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "user",
    },
  });
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const payload = {
        id: credentials.user.uid,
        email: credentials.user.email,
        token: credentials.user.accessToken,
        isAuth: true,
        role: values.role,
      };
      dispatch({ type: "LOGIN", payload });
      await addToDatabase("users", {
        email: credentials.user.email,
        name: values.name,
        role: values.role,
      });
      toast.success("Signed up successfully");
      setLoading(false);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already Used");
        setLoading(false);
      } else {
        console.log(error.message);
        toast.error("Failed to Sign Up");
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-start items-center min-h-screen overflow-hidden p-8 w-screen">
      <div className="md:w-full lg:max-w-lg w-[300px] ">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to Create an account
            </CardDescription>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            label="Email"
                            placeholder="Email"
                            disabled={loading}
                            {...field}
                            className="my-2 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="Name"
                            type="text"
                            placeholder="Full Name"
                            disabled={loading}
                            {...field}
                            className="my-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="Password"
                            type="password"
                            placeholder="Password"
                            disabled={loading}
                            {...field}
                            className="my-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            label="Admin"
                            disabled={loading}
                            onCheckedChange={(checked) => {
                              form.setValue("role", checked ? "admin" : "user");
                            }}
                            {...field}
                            className="my-2"
                          />
                        </FormControl>
                        <FormLabel className="mx-3 items-center justify-center leading-none">
                          is Admin ?
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full hover:bg-gray-800">
                  {loading ? "signning up..." : "Sign up"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-gray-700">
              {" "}
              Already have an account?{" "}
              <Link to="/signin" className=" text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
