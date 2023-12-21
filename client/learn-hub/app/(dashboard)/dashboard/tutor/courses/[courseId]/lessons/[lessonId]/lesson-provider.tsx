"use client";

import { getOneLessonOfCourseId } from "@/actions/lessons";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

interface LessonEditContextProps {
    lesson?: Lesson,
    documents?: CourseDocument[],
    setLesson: Dispatch<SetStateAction<Lesson | undefined>>,
    setDocuments: Dispatch<SetStateAction<CourseDocument[] | undefined>>
}

export const LessonEditContext = createContext<LessonEditContextProps>({
    lesson: undefined,
    setLesson: () => {},
    documents: undefined,
    setDocuments: () => {}
})

export const LessonEditContextProvider = ({children, params} : {children : React.ReactNode, params : {courseId : string, lessonId : string}}) => {
    const [lesson, setLesson] = useState<Lesson>();
    const [documents, setDocuments] = useState<CourseDocument[]>();
    
    useEffect(() => {
        getOneLessonOfCourseId(params.courseId, params.lessonId).then((res) => {
            if (res && res.status === 200) {
                setLesson(res.data.lesson);
                setDocuments(res.data.documents);
            }
        })
    }, []);

    return (
        <LessonEditContext.Provider value={{lesson, setLesson, documents, setDocuments}}>
            {children}
        </LessonEditContext.Provider>
    );
};