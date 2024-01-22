"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AppContext } from "@/app/auth-provider";
import { CustomizedInput } from "@/components/ui/input";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const signinFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(255, {
      message: "Username must not be longer than 266 characters.",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(255, {
      message: "Password must not be longer than 255 characters.",
    }),
});

type signinFormValues = z.infer<typeof signinFormSchema>;

const defaultValues: Partial<signinFormValues> = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const { isAuth, setAuth } = React.useContext(AppContext);
  const router = useRouter();

  const form = useForm<signinFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof signinFormSchema>) => {
    const res = await login(values.username, values.password);
    if (res) {
      if (res.status == 200) {
        setAuth(true);
        router.push("/");
        localStorage.setItem("is_admin", res.data.is_admin);
        localStorage.setItem("is_tutor", res.data.is_tutor);
        localStorage.setItem("is_student", res.data.is_student);
        localStorage.setItem("is_supporter", res.data.is_supporter);
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center px-16 py-0 max-md:px-5">
      <div className="items-start shadow-2xl bg-white flex w-[470px] max-w-full flex-col mt-20 mb-20 px-5 py-5 rounded-3xl max-md:my-20">
        <div className="text-black text-3xl font-medium self-stretch whitespace-nowrap max-md:max-w-full">
          Sign In
        </div>
        <div className="text-black text-base self-stretch whitespace-nowrap mt-8 max-md:max-w-full">
          Do not have an account?
        </div>
        <div className="text-sky-500 text-base self-stretch mt-3.5 max-md:max-w-full">
          <span className=" text-black">You can </span>
          <Link href="/signup">
            <button className="font-semibold text-sky-500">Sign up here !</button>
          </Link>
        </div>
        <div className="flex w-[470px] max-w-full flex-col rounded-3xl max-md:my-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <div className="flex w-[470px] max-w-full flex-col rounded-3xl max-md:my-10">
                    <div className="text-neutral-400 text-sm font-medium self-stretch whitespace-nowrap mt-5 max-md:max-w-full max-md:mt-5">
                      Username
                    </div>
                    <div className="self-stretch flex w-full justify-between gap-5 mt-5 items-start max-md:max-w-full max-md:flex-wrap">
                      <div className="flex items-stretch gap-3">
                        <img
                          loading="lazy"
                          src="./icon/user.svg"
                          className="aspect-square object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
                        />
                        <CustomizedInput
                          placeholder="Enter your username"
                          {...field}
                        />
                      </div>
                    </div>
                    <div className="bg-neutral-400 flex w-[430px] shrink-0 h-0.5 flex-col max-md:mt-0 mt-2.5 max-md:max-w-full" />
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="flex w-[470px] max-w-full flex-col rounded-3xl max-md:my-10">
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
                        <CustomizedInput
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </div>
                    </div>
                    <div className="bg-neutral-400 flex w-[430px] shrink-0 h-0.5 flex-col max-md:mt-0 mt-2.5 max-md:max-w-full" />
                    <FormMessage />
                  </div>
                )}
              />
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className="mt-5 w-full"
              >
                Sign in
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
