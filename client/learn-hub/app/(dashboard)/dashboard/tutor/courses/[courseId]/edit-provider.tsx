"use client";

import { getCourse } from "@/actions/courses";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

interface EditContextProps {
    course: Course,
    setCourse: Dispatch<SetStateAction<Course>>,
}

export const EditContext = createContext<EditContextProps>({
    course: undefined,
    setCourse: () => {},
})

export const EditContextProvider = ({children, params} : {children : React.ReactNode, params : {courseId : string}}) => {
    const [course, setCourse] = useState<Course>();
    
    useEffect(() => {
        getCourse(params.courseId).then((res) => {
            if (res && res.status === 200) {
                setCourse(res.data.course);
            }
        })
    }, []);

    return (
        <EditContext.Provider value={{course, setCourse}}>
            {children}
        </EditContext.Provider>
    );
};
