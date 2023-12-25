"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, UserCog } from "lucide-react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { format } from "date-fns";

import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { getMineUser, updateUser } from "@/actions/users";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  DashboardSection,
  DashboardSectionContent,
  DashboardSectionHeader,
} from "../_components/dashboard-section";

const profileFormSchema = z.object({
  full_name: z.string().optional(),
  phone_number: z.string().min(8).max(15).optional(),
  institute: z.string().optional(),
  area_of_study: z.string().optional(),
  biography: z.string().max(160).min(4).optional(),
  date_of_birth: z
    .date({
      required_error: "A date of birth is required.",
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {};

const Profile = () => {
  const [user, setUser] = useState<User>();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    getMineUser().then((res) => {
      if (res) {
        if (res.status == 200) {
          setUser(res.data.user);
          if (res.data.user.full_name) {
            form.setValue("full_name", res.data.user.full_name);
          }

          if (res.data.user.phone_number) {
            form.setValue("phone_number", res.data.user.phone_number);
          }
          if (res.data.user.date_of_birth) {
            form.setValue(
              "date_of_birth",
              new Date(res.data.user.date_of_birth),
            );
          }
          if (res.data.user.institute) {
            form.setValue("institute", res.data.user.institute);
          }
          if (res.data.user.area_of_study) {
            form.setValue("area_of_study", res.data.user.area_of_study);
          }
          if (res.data.user.biography) {
            form.setValue("biography", res.data.user.biography);
          }
        }
      }
    });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: ProfileFormValues) => {
    const res = await updateUser(data);
    if (res) {
      if (res.status == 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <DashboardSection>
      <DashboardSectionHeader icon={UserCog}>Profile</DashboardSectionHeader>
      <DashboardSectionContent>
        <div className="p-6 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your fullname here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your institute here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area_of_study"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area of study</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your area of study here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={2}
                        placeholder="Enter your biography here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update profile</Button>
            </form>
          </Form>
        </div>
      </DashboardSectionContent>
    </DashboardSection>
  );
};

export default Profile;
