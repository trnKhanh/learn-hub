"use client";

import { createContext, useEffect, useState } from "react"

type LearningLesson = Lesson & {
    studentProgress: LearnLesson | null;
};

interface LearnContextProps {
    lessons: LearningLesson[] | undefined,
    setLessons: React.Dispatch<React.SetStateAction<LearningLesson[] | undefined>>,
}

export const LearnContext = createContext<LearnContextProps>({
    lessons: undefined,
    setLessons: () => {},
})

export const LearnProvider = ({children, params} : {children : React.ReactNode, params : {courseId : string}}) => {
    const [lessons, setLessons] = useState<LearningLesson[]>();

    useEffect(() => {
        
    }, [])

    return (
        <LearnContext.Provider value={{lessons, setLessons}}>
            {children}
        </LearnContext.Provider>
    );
};
