"use client";

import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { useContext } from "react";
import { EditContext } from "./edit-provider";
import { Skeleton } from "@/components/ui/skeleton";

const CourseIdPage =  ({
  params
}: {
  params: { courseId: string }
}) => {

  const {course} = useContext(EditContext);
  if (!course) return (
    <div className="items-center">
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </div>
  )

  const categories = ["Programming", "UX/UI Design", "Marketing", "Photography", "Animation", "Video", "Business", "Finance"];

  const requiredFields = [
    course.name,
    course.description,
    course.profile_picture,
    course.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Course setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            course = { course }
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your course
              </h2>
            </div>
            <TitleForm
              title = {course.name}
            />
            <DescriptionForm
              description={course.description}
            />
            <ImageForm />
            <CategoryForm
              options={categories.map((category, index) => ({
                label: category,
                value: (index + 1).toString(),
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Course chapters
                </h2>
              </div>
              <ChaptersForm />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">
                  Sell your course
                </h2>
              </div>
              <PriceForm
                price={course.price}
                courseId={course.id.toString()}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">
                  Resources & Attachments
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseIdPage;