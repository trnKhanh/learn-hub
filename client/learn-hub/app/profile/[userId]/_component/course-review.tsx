"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { CoursesList } from "./course-list";
import { getCoursesOfTutor } from "@/actions/tutors";
import { Skeleton } from "@mui/material";

const CourseReviewSection = ({tutor_id} : {tutor_id: string}) => {
    const [courses, setCourses] = useState<Course[]>();

    useEffect(() => {
        getCoursesOfTutor().then((res) => {
            if (res) {
                console.log("retrieve courses");
                if (res.status === 200) {
                    setCourses(res.data.courses);
                }
            }
        })
    },[]);
    
    if (courses === undefined) {
        return (
            <Skeleton variant="rectangular" width="100%" height="100%" />
        )
    }
    
    return ( 
        <div className="w-full">
            <Tabs defaultValue="courses" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>
                <TabsContent value="courses">
                    <h3 className="text-xl font-bold mt-5 mb-5 ml-5">Courses ({courses.length})</h3>
                    <CoursesList items={courses}/>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default CourseReviewSection;