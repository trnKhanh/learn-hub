"use client";

import { getCourseProgress } from "@/actions/courses";
import { createContext, useContext, useEffect, useState } from "react"

interface LearnLessonContextProps {
    lessons: LearnLesson[] | undefined,
    setLessons: React.Dispatch<React.SetStateAction<LearnLesson[] | undefined>>,
    progress: number,
    setProgress: React.Dispatch<React.SetStateAction<number>>
}

export const LearnLessonContext = createContext<LearnLessonContextProps>({
    lessons: undefined,
    setLessons: () => {},
    progress: 0,
    setProgress: () => {}
})

export const LearnLessonProvider = ({children, params} : {children : React.ReactNode, params : {courseId : string}}) => {
    const [lessons, setLessons] = useState<LearnLesson[]>();
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        getCourseProgress(params.courseId).then((res) => {
            if (res) {
                if (res.status == 200) {
                    console.log("hi");
                    console.log(res.data);
                    setLessons(res.data.progress.lessons);
                    setProgress(res.data.progress.progress);
                }
            }
        })
    }, []);

    return (
        <LearnLessonContext.Provider value={{lessons, setLessons, progress, setProgress}}>
            {children}
        </LearnLessonContext.Provider>
    );
};