"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  putFinancialAid,
  getAllCourses,
  getCourse,
  getMineFinancialAid,
} from "@/actions/courses";
import { toast } from "react-toastify";
import { notFound, usePathname, useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";

const FinancialAid = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const [course, setCourse] = useState<Course>();
  const [financialAid, setFinancialAid] = useState<FinancialAid>();
  const [isLoading, setIsLoading] = useState(true);
  const [canUpdate, setCanUpdate] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const financialAidSchema = z.object({
    essay: z
      .string()
      .min(200, { message: "Essay must be at least 200 characters" }),
    amount: z
      .number()
      .min(0, { message: "Amount of money must be at least 0" })
      .max(course ? course.price : 0, {
        message: "Amount of money cannot exceed course's price",
      }),
  });

  const form = useForm<z.infer<typeof financialAidSchema>>({
    resolver: zodResolver(financialAidSchema),
    defaultValues: {
      essay: "",
      amount: 0,
    },
  });

  useEffect(() => {
    getCourse(params.courseId).then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourse(res.data.course);
        } else {
          toast.error(res.data.message);
          router.push(`/courses/${params.courseId}`);
        }
      }
      getMineFinancialAid(params.courseId).then((res) => {
        if (res) {
          if (res.status == 200) {
            setFinancialAid(res.data.financialAid);
            if (res.data.financialAid.status != "PENDING") {
              setCanUpdate(false);
            }
            form.setValue("essay", res.data.financialAid.essay);
            form.setValue("amount", res.data.financialAid.amount);
          }
        }
        setIsLoading(false);
      });
    });
  }, [isUpdating]);


  if (isLoading) {
    return <div className="pt-[6.4rem]">Loading...</div>;
  }

  if (!course) {
    notFound();
  }

  const onSubmit = async (value: z.infer<typeof financialAidSchema>) => {
    if (!canUpdate) return;
    setIsUpdating(true);
    const res = await putFinancialAid(params.courseId, value);
    if (res) {
      if (res.status != 201) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    }
    setIsUpdating(false);
  };

  return (
    <div className="pt-[6.4rem] flex flex-col space-y-2 max-w-xl mx-auto">
      <p className="text-3xl">
        <span className="font-[500] text-slate-400">Course:</span> {course.name}
      </p>
      <p className="text-xl font-bold">
        Financial aid form:{" "}
        {financialAid &&
          (financialAid.status.includes("PASSED") ? (
            financialAid.status == "ADMIN_PASSED" ? (
              <span className="text-slate-500">
                Waiting for tutors to inspect
              </span>
            ) : (
              <span className="text-lime-500">Passed</span>
            )
          ) : financialAid.status.includes("DENIED") ? (
            <span className="text-red-500">Denied</span>
          ) : (
            <span className="text-slate-500">Pending</span>
          ))}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-6 border"
        >
          <FormField
            control={form.control}
            name="essay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason you apply for aids</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Write your essay here..."
                    {...field}
                    disabled={!canUpdate}
                  />
                </FormControl>
                <FormDescription>
                  Why do you need financial aid?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Amount you can pay: {value}</FormLabel>
                {canUpdate && (
                  <FormControl>
                    <Slider
                      min={0}
                      max={course.price}
                      step={1}
                      defaultValue={[value]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>
                )}
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {canUpdate && (
            <Button type="submit" disabled={isUpdating}>
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default FinancialAid;
