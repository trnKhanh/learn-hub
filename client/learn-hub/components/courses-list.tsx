import { CourseCard } from "@/components/course-card";
import { CourseCardHorizontal } from "./course-card-horizontal";

type CourseWithProgressWithCategory = Course & {
  category: Subject | null;
  chapters: { id: string }[];
  progress: number | null;
  image_url: string | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
  isHorizontal: boolean;
}

export const CoursesList = ({
  courses,
  isHorizontal,
}: {
  courses: Course[];
  isHorizontal: boolean;
}) => {
  return (
    <div>
      {isHorizontal && (
        <div className="grid grid-col-1 gap-4">
          {courses.map((item) => (
            <CourseCardHorizontal key={item.id} id={item.id} />
          ))}
        </div>
      )}
      {!isHorizontal && (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {courses.map((item) => (
            <CourseCard key={item.id} id={item.id} />
          ))}
        </div>
      )}
      {courses.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
