"use client";

import { getCourse } from "@/actions/courses";
import { createContext, useEffect, useState } from "react"

interface CourseContextProps {
    course: Course | undefined,
    setCourse: React.Dispatch<React.SetStateAction<Course | undefined>>,
    isPurchased: boolean,
    setPurchased: React.Dispatch<React.SetStateAction<boolean>>
}

export const CourseContext = createContext<CourseContextProps>({
    course: undefined,
    setCourse: () => {},
    isPurchased: false,
    setPurchased: () => {}
})

export const CourseProvider = ({children, params} : {children : React.ReactNode, params : {courseId : string}}) => {
    const [course, setCourse] = useState<Course>();
    const [isPurchased, setPurchased] = useState<boolean>(false);

    useEffect(() => {
        getCourse(params.courseId).then((res) => {
            if (res) {
                if (res.status == 200) {
                    setCourse(res.data.course);
                }
            }
        });
    }, [])

    useEffect(() => {
        // TODO: Check if user has purchased course
    }, [])

    return (
        <CourseContext.Provider value={{course, setCourse, isPurchased, setPurchased}}>
            {children}
        </CourseContext.Provider>
    );
};