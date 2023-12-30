import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_component/video-player";
import { CourseEnrollButton } from "./_component/course-enroll-button";
import { CourseProgressButton } from "./_component/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) => {
  const {
    lesson,
    course,
    videoData,
    documents,
    nextLesson,
    studentProgress,
    purchase,
  } = {
    lesson: {
      id: "1",
      course_id: "1",
      name: "Introduction to Programming",
      isPublished: true,
      isFree: false,
    },
    course: {
      id: "1",
      name: "JavaScript Fundamentals",
      description: "Learn the basics of JavaScript programming language.",
      difficulty: "Beginner",
      duration: 30,
      owner_id: "user123",
      price: 50,
      discount: 10,
      profile_picture: "url_to_image",
      isPublished: true,
    },
    videoData: {
      assetId: "asset001",
      playbackId: "playback001",
      lesson_id: 1,
      course_id: 1,
    },
    documents: [
      {
        id: 1,
        course_id: 1,
        lesson_id: 1,
        name: "Introduction to Programming PDF",
        file_path: "/files/intro_to_programming.pdf",
      },
      {
        id: 2,
        course_id: 101,
        lesson_id: 2,
        name: "Data Structures Cheat Sheet",
        file_path: "/files/data_structures_cheat_sheet.pdf",
      },
    ],
    nextLesson: {
      id: "2",
      name: "Python for Data Science",
      description: "Explore Python for data analysis and machine learning.",
      difficulty: "Intermediate",
      duration: 45,
      owner_id: "user456",
      price: 70,
      discount: 15,
      profile_picture: "url_to_image",
      isPublished: true,
    },
    studentProgress: {
      course_id: "1",
      lesson_id: "1",
      student_id: "student123",
      finished_at: "2023-12-20T10:00:00Z",
    },
    purchase: false,
  };

  if (!lesson || !course) {
    return redirect("/");
  }

  const isLocked = !lesson.isFree && !purchase;
  const completeOnEnd = !!purchase && !studentProgress?.finished_at;

  return (
    <div>
      {studentProgress?.finished_at && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          {/*<VideoPlayer
                chapterId={params.lessonId}
                title={lesson.name}
                courseId={params.courseId}
                nextChapterId={nextLesson?.id}
                playbackId={videoData?.playbackId}
                isLocked={isLocked}
                completeOnEnd={completeOnEnd}
        />*/}
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{lesson.name}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.lessonId}
                courseId={params.courseId}
                nextChapterId={nextLesson?.id}
                isCompleted={!!studentProgress?.finished_at}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={lesson.name!} />
          </div>
          {!!documents.length && (
            <>
              <Separator />
              <div className="p-4">
                {documents.map((document) => (
                  <a
                    href={document.file_path}
                    target="_blank"
                    key={document.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    rel="noreferrer"
                  >
                    <File />
                    <p className="line-clamp-1">{document.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
