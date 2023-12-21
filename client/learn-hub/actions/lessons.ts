export const getAllLessonsOfCourseId = async (course_id: string | undefined) => {
    try {
        const res = await fetch(`http://localhost:3001/courses/${course_id}/lessons/edit`, {
            credentials: "include",
        });
        const data: { message: string; lessons: Lesson[] } = await res.json();
    
        return { status: res.status, data: data };
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const getOneLessonOfCourseId = async (course_id: string | undefined, lesson_id: string | undefined) => {
    try {
        const res = await fetch(`http://localhost:3001/courses/${course_id}/lessons/${lesson_id}`, {
            credentials: "include",
        });
        const data: { message: string; lesson: Lesson, documents: CourseDocument[] } = await res.json();
        console.log("hello");
        return { status: res.status, data: data };
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const updateLesson = async (course_id: string | undefined, lesson_id: string | undefined, attribute: any) => {
    try {
        const res = await fetch(`http://localhost:3001/courses/${course_id}/lessons/${lesson_id}`, {
            credentials: "include",
            method: "PATCH",
            body: JSON.stringify(attribute),
            headers: new Headers({
            "content-type": "application/json",
            }),
        });
        const data: { message: string; lesson: Lesson } = await res.json();
    
        return { status: res.status, data: data };
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const deleteLesson = async (course_id: string | undefined, lesson_id: string | undefined) => {
    try {
        const res = await fetch(`http://localhost:3001/courses/${course_id}/lessons/${lesson_id}`, {
            credentials: "include",
            method: "DELETE",
        });
        const data: { message: string; lesson: Lesson } = await res.json();
    
        return { status: res.status, data: data };
    } catch (err) {
        console.error(err);
        return null;
    }
};