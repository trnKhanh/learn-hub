"use client";

import { getCourseProgress } from "@/actions/courses";
import { createContext, useContext, useEffect, useState } from "react"

interface LearnLessonContextProps {
    lessons: LearnLesson[] | undefined,
    setLessons: React.Dispatch<React.SetStateAction<LearnLesson[] | undefined>>,
}

export const LearnLessonContext = createContext<LearnLessonContextProps>({
    lessons: undefined,
    setLessons: () => {},
})

export const LearnLessonProvider = ({children, params} : {children : React.ReactNode, params : {courseId : string}}) => {
    const [lessons, setLessons] = useState<LearnLesson[]>();

    useEffect(() => {
        getCourseProgress(params.courseId).then((res) => {
            if (res) {
                if (res.status == 200) {
                    console.log("hi");
                    console.log(res.data);
                    setLessons(res.data.progress.lessons);
                }
            }
        })
    }, []);

    return (
        <LearnLessonContext.Provider value={{lessons, setLessons}}>
            {children}
        </LearnLessonContext.Provider>
    );
};