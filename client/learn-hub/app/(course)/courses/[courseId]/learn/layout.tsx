import { redirect } from "next/navigation";


import { CourseSidebar } from "./_component/course-sidebar";
import { CourseNavbar } from "./_component/course-navbar";

const CourseLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { courseId: string };
}) => {

    const dummyCourses = {
        id: "course1",
        name: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming language.",
        difficulty: "Beginner",
        duration: 30,
        owner_id: "user123",
        price: 50,
        discount: 10,
        profile_picture: "url_to_image",
        isPublished: true,
        lessons: [
            {
                id: "lesson1",
                course_id: "course1",
                name: "Variables and Data Types",
                isPublished: true,
                isFree: true,
                studentProgress: {
                course_id: "course1",
                lesson_id: "lesson1",
                student_id: "student123",
                finished_at: "2023-12-20T10:00:00Z",
                },
            },
            {
                id: "lesson2",
                course_id: "course1",
                name: "Control Flow and Loops",
                isPublished: true,
                isFree: true,
                studentProgress: null,
            },
        ],
        progressCount: 1,
    }
    
    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavbar
                    course={dummyCourses}
                    progressCount={10}
                />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar
                    course={dummyCourses}
                    progressCount={10}
                />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}

export default CourseLayout