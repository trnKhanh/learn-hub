"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField } from "@/components/ui/form";
import { CustomizedInput } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

const signInFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(255, {
      message: "Password must not be longer than 255 characters.",
    }),
  rememberMe: z.boolean(),
});

type signInFormValues = z.infer<typeof signInFormSchema>;

const defaultValues: Partial<signInFormValues> = {
  email: "",
  password: "",
  rememberMe: false, // Giá trị mặc định của rememberMe
}

function Signin(_props: any) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<signInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    console.log(values);
    try {
      const response = await axios.post("http://localhost:3001/signin", values);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        router.push("/");
        toast({
          title: "You have successfully signed in.",
        });
      } else {
        toast({
          title: "An error occurred. Status: " + response.status,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        toast({
          title: "An Axios error occurred: " + axiosError.message,
        });
      } else {
        toast({
          title: "An error occurred: " + error,
        });
      }
    }
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center px-16 py-0 max-md:px-5">
      <div className="items-start shadow-2xl bg-white flex w-[470px] max-w-full flex-col mt-20 mb-20 px-5 py-5 rounded-3xl max-md:my-20">
        <div className="text-black text-3xl font-medium self-stretch whitespace-nowrap max-md:max-w-full">
          Sign In
        </div>
        <div className="text-black text-base self-stretch whitespace-nowrap mt-8 max-md:max-w-full">
            If you don’t have an account register
        </div>
        <div className="text-sky-500 text-base self-stretch mt-3.5 max-md:max-w-full">
          <span className=" text-black">You can </span>
          <button className="font-semibold text-sky-500"> Register here !</button>
        </div>
        <div className="flex w-[470px] max-w-full flex-col rounded-3xl max-md:my-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="flex w-[470px] max-w-full flex-col rounded-3xl max-md:my-10">
                    <div className="text-neutral-400 text-sm font-medium self-stretch whitespace-nowrap mt-5 max-md:max-w-full max-md:mt-5">
                      Email
                    </div>
                    <div className="self-stretch flex w-full justify-between gap-5 mt-5 items-start max-md:max-w-full max-md:flex-wrap">
                      <div className="flex items-stretch gap-3">
                        <img
                          loading="lazy"
                          src="./icon/mail.svg"
                          className="aspect-square object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
                        />
                        <CustomizedInput type="email" placeholder="Enter your email address" {...field} />
                      </div>
                    </div>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="flex w-[470px] max-w-full flex-col rounded-3xl max-md:my-10">
                    <div className="bg-neutral-400 flex w-[430px] shrink-0 h-0.5 flex-col max-md:mt-0 mt-2.5 max-md:max-w-full" />
                    <div className="text-neutral-400 text-sm font-medium self-stretch whitespace-nowrap mt-5 max-md:max-w-full max-md:mt-5">
                      Password
                    </div>
                    <div className="self-stretch flex w-full justify-between gap-5 mt-5 items-start max-md:max-w-full max-md:flex-wrap">
                      <div className="flex items-stretch gap-3">
                        <img
                          loading="lazy"
                          src="./icon/padlock.svg"
                          className="aspect-square object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
                        />
                        <CustomizedInput type="password" placeholder="Enter your password" {...field} />
                      </div>
                    </div>
                  </div>
                )}
              />
              <div className="bg-neutral-400 self-stretch flex w-full shrink-0 h-0.5 flex-col mt-2.5 max-md:max-w-full" />
              <div className="self-stretch flex w-full justify-between items-center mt-5 max-md:max-w-full max-md:flex-wrap">
                <div className="flex items-center gap-3 text-neutral-400 text-sm font-medium">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="rounded border-gray-300"
                    {...form.register("rememberMe")}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div className="text-sky-500 text-sm font-medium max-md:max-w-full max-md:mt-5">
                  <button className="font-semibold text-gray-400">Forgot Password?</button>
                </div>
              </div>
              <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting} className="mt-5 w-full">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signin;