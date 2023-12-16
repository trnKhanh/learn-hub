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

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const categories = await getAllCategories();

  const course = await getCourse(params.courseId);
  if (course === undefined) {
    return Promise.reject(new Error("Course not found"));
  }
  const categoriesOfCourse = await getCategoriesOfCourseId(params.courseId);
  const lessons = await getAllLessonsByCourseId(params.courseId);
  const documents = await getAllDocumentsByCourseId(params.courseId);
  
  /*const courseSample = {
    "id": "1",
    "isPublished": true,
    "title": "Introduction to Operating System",
    "description": "Learn the basics of operating system",
    "imageUrl": "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
    "price": 49.99,
    "categoryId": "1",
    "chapters": [
      {
        "id": "1",
        "title": "Introduction",
        "isPublished": true,
        "isFree": true,
      },
      {
        "id": "2",
        "title": "Multi-tasking",
        "isPublished": true,
        "isFree": false,
      }
    ],
    "attachments": [
      {
        "id": "1",
        "name": "Introduction to Operating System",
        "url": "",
        "type": "pdf"
      }
    ],
    "name": "Introduction to Operating System",
    "difficulty": "Beginner",
    "duration": 100,
    "owner_id": "1",
    "created_at": "2017-01-01T00:00:00.000Z",
    "discount": 0,
    "profile_picture": "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg"
  }

  const course = {
    "id": "1",
    "isPublished": true,
    "title": "Introduction to Operating System",
    "name": "Introduction to Operating System",
    "difficulty": "Beginner",
    "description": "Learn the basics of operating system",
    "imageUrl": "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
    "price": 49.99,
    "categoryId": "1",
    "duration": 100,
    "owner_id": "1",
    "created_at": "2017-01-01T00:00:00.000Z",
    "discount": 0,
    "profile_picture": "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg"
  }*/

  const requiredFields = [
    /*courseSample.title,
    courseSample.description,
    courseSample.imageUrl,
    courseSample.price,
    courseSample.categoryId,
    courseSample.chapters.some(chapter => chapter.isPublished),*/
    course.name,
    course.description,
    course.profile_picture,
    course.price,
    categoriesOfCourse[0].id.toString(),
    //lessons.some(chapter => chapter.isPublished),
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
              title={course.name}
              courseId={course.id.toString()}
            />
            <DescriptionForm
              description={course.description}
              courseId={course.id.toString()}
            />
            <ImageForm
              initialData={course}
              courseId={course.id.toString()}
            />
            <CategoryForm
              //initialData={course}
              categoryId={categoriesOfCourse[0].id.toString()}
              courseId={course.id.toString()}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id.toString(),
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
              <ChaptersForm
                chapters={lessons}
                courseId={course.id.toString()}
              />
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
              <AttachmentForm
                documents={documents}
                courseId={course.id.toString()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseIdPage;