"use client";

import { getOneLessonOfCourseId } from "@/actions/lessons";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

interface LessonEditContextProps {
    lesson: Lesson,
    setLesson: Dispatch<SetStateAction<Lesson>>
}

export const LessonEditContext = createContext<LessonEditContextProps>({
    lesson: undefined,
    setLesson: () => {},
})

export const LessonEditContextProvider = ({children, params} : {children : React.ReactNode, params : {courseId : string, lessonId : string}}) => {
    const [lesson, setLesson] = useState<Lesson>();
    
    useEffect(() => {
        getOneLessonOfCourseId(params.courseId, params.lessonId).then((res) => {
            if (res && res.status === 200) {
                setLesson(res.data.course);
            }
        })
    }, []);

    return (
        <LessonEditContext.Provider value={{lesson, setLesson}}>
            {children}
        </LessonEditContext.Provider>
    );
};