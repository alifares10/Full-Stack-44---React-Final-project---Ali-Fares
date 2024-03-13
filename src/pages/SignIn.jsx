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
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const payload = {
        id: credentials.user.uid,
        email: credentials.user.email,
        token: credentials.user.accessToken,
        isAuth: true,
      };
      dispatch({ type: "LOGIN", payload });
      toast.success("Logged in successfully");
      setLoading(false);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
        setLoading(false);
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Wrong Email or Password");
        setLoading(false);
      } else {
        console.log(error);
        toast.error("Failed to login");
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-start items-center min-h-screen overflow-hidden p-8">
      <div className="md:w-full lg:max-w-lg w-[300px] ">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
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
                </div>
                <Button type="submit" className="w-full hover:bg-gray-800">
                  {loading ? "signning in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-gray-700">
              {" "}
              Dont have an account?{" "}
              <Link to="/signup" className=" text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
