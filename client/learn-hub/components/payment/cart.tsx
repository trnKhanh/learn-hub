"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { CourseThumbnail } from "./_components/course-thumbnail";
import { useEffect, useState } from "react";
import { createPayment, getCart } from "@/actions/courses";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const CourseCart = () => {
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [courseIds, setCourseIds] = useState<{ course_id: string }[]>([]);

  const router = useRouter();

  useEffect(() => {
    getCart().then((res) => {
      if (res) {
        if (res.status == 200) {
          setTotalMoney(res.data.total_money);
          setCourseIds(res.data.course_ids);
        }
      }
    });
  }, []);

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {courseIds.map((courseId) => (
            <CourseThumbnail
              key={courseId.course_id}
              course_id={courseId.course_id}
            />
          ))}
          <div className="bg-neutral-400 flex w-[full] shrink-0 h-0.5 flex-col max-md:mt-0 mt-2.5 max-md:max-w-full" />
          <div className="flex flex-col mt-5">
            <p className="text-xl font-medium leading-none">Order Summary</p>
            <div className="flex flex-row items-center space-x-4 mt-5">
              <p className="text-sm text-muted-foreground">Subtotal:</p>
              <p className="text-sm text-muted-foreground">
                {courseIds.length} items
              </p>
            </div>
            <div className="flex flex-row items-center space-x-4">
              <p className="text-sm text-muted-foreground">Discount:</p>
              <p className="text-sm text-muted-foreground">0%</p>
            </div>
          </div>
          <div className="bg-neutral-400 flex w-[full] shrink-0 h-0.5 flex-col max-md:mt-0 mt-2.5 max-md:max-w-full" />
          <div className="flex flex-row items-center space-x-4 mt-5">
            <p className="text-xl font-medium leading-none">Total</p>
            <p className="text-xl font-medium leading-none">
              ${String(totalMoney)}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={async (e) => {
              const res = await createPayment();
              if (res) {
                if (res.status == 201) {
                  toast.success(res.data.message);
                  router.push(`/dashboard/my-courses/`)
                } else {
                  toast.error(res.data.message);
                }
              }
            }}
            className="w-full"
          >
            Complete Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
