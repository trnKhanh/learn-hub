"use client";

import { useContext, useEffect, useState } from "react";
import { getCart } from "@/actions/courses";
import { CourseThumbnail } from "./_components/course-thumbnail";
import {
  DashboardSection,
  DashboardSectionContent,
  DashboardSectionHeader,
} from "../_components/dashboard-section";
import Link from "next/link";
import { CartContext, CartProvider } from "./cart-provider";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const [courseIds, setCourseIds] = useState<{ course_id: string }[]>([]);
  const { isUpdating } = useContext(CartContext);
  useEffect(() => {
    getCart().then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourseIds(res.data.course_ids);
        }
      }
    });
  }, [isUpdating]);

  console.log(isUpdating);
  return (
    <DashboardSection>
      <DashboardSectionHeader icon={ShoppingCart}>Shopping Cart</DashboardSectionHeader>
      <DashboardSectionContent>
        <div className="flex flex-col items-center">
          <Link 
            className="text-1xl font-bold text-white bg-sky-500 p-3 rounded-full hover:bg-sky-600"
            href="/payment">Pay now</Link>
        </div>
        <div className="flex flex-col border-t-8">
          <div className="p-6 flex flex-col space-y-2 divide-y-2 grow overflow-auto">
            {courseIds.map((course) => {
              return (
                <CourseThumbnail
                  key={course.course_id}
                  course_id={course.course_id}
                />
              );
            })}
          </div>
        </div>
      </DashboardSectionContent>
    </DashboardSection>
  );
};

export default Cart;
