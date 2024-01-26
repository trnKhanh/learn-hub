import { LearnLessonProvider } from "./learn-lesson-provider";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  return <LearnLessonProvider params={params}>{children}</LearnLessonProvider>;
};

export default CourseLayout;
