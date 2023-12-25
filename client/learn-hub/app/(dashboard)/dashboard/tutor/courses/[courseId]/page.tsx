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
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { getAllCategories } from "@/actions/category";
import { getAllLessonsByCourseId, getAllDocumentsByCourseId, getCategoriesOfCourseId, getCourse } from "@/actions/courses";
import { useContext } from "react";
import { EditContext, EditContextProvider } from "./edit-provider";

const CourseIdPage =  ({
  params
}: {
  params: { courseId: string }
}) => {

  const {course} = useContext(EditContext);
  if (!course) return (<div>loading
  </div>)
  //console.log(course);

  //const categories = getAllCategories();

  /*if (course === undefined) {
    return Promise.reject(new Error("Course not found"));
  }*/

  /*const categoriesOfCourse = getCategoriesOfCourseId(params.courseId);

  const lessons = getAllLessonsByCourseId(params.courseId);
  const documents = getAllDocumentsByCourseId(params.courseId);*/
  /*const requiredFields = [
    course.name,
    course.description,
    course.profile_picture,
    course.price,
    //categoriesOfCourse[0].id.toString(),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);*/

  const isComplete = false;
  const completionText = "";

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
              courseId={course.id.toString()}
            />
            <ImageForm
              initialData={course}
              courseId={course.id.toString()}
            />
            {/*<CategoryForm
              categoryId={categoriesOfCourse[0].id.toString()}
              courseId={course.id.toString()}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id.toString(),
              }))}
            />*/}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Course chapters
                </h2>
              </div>
              {/*<ChaptersForm
                chapters={lessons}
                courseId={course.id.toString()}
          />*/}
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
              {/*<AttachmentForm
                documents={documents}
                courseId={course.id.toString()}
          />*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseIdPage;