"use client";

import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { LessonTitleForm } from "./_components/lesson-title-form";
//import { LessonDescriptionForm } from "./_components/lesson-description-form";
import { LessonAccessForm } from "./_components/lesson-access-form";
import { LessonVideoForm } from "./_components/lesson-video-form";
import { LessonActions } from "./_components/lesson-actions";
import { LessonEditContext } from "./lesson-provider";
import { useContext, useState } from "react";
import { LessonDocumentForm } from "./_components/lesson-document-form";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { updateLesson, uploadVideo } from "@/actions/lessons";
import { toast } from "react-toastify";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) => {
  const { lesson } = useContext(LessonEditContext);
  const [isUploading, setIsUploading] = useState(false);
  const [video, setVideo] = useState<File>();

  const requiredFields = [lesson?.name, lesson?.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!lesson?.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/tutor/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Lesson Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <LessonActions disabled={!isComplete} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your lesson</h2>
              </div>
              <LessonTitleForm />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <LessonAccessForm />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Resources & Documents</h2>
              </div>
              <LessonDocumentForm
                courseId={params.courseId}
                lessonId={params.lessonId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            {/* <LessonVideoForm/> */}
            {/* <div className="w-1/2 flex space-x-2 items-center"> */}
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
              <form
                className="flex flex-col space-x-2 items-center mx-auto"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (video) {
                    setIsUploading(true);
                    const res = await uploadVideo(
                      lesson?.course_id,
                      lesson?.id,
                      video,
                    );
                    if (res) {
                      if (res.status === 200) {
                        toast.success(res.data.message);
                      } else {
                        toast.error(res.data.message);
                      }
                    }
                    setIsUploading(false);
                  }
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                >
                  Upload Video Lesson
                  <input
                    className="w-0"
                    type="file"
                    accept=".mp4"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length)
                        setVideo(e.target.files[0]);
                    }}
                  />
                  {video && (
                    <div className="ml-3 pl-3 border-l-white border-l-2">
                      {video.name}
                    </div>
                  )}
                </Button>
                <Button className="mt-2">
                  <input className="text-lg" type="submit" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
