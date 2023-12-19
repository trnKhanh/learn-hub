"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileContext } from "../profile-provider";
import { useContext, useEffect, useState } from "react";
import { CoursesList } from "./course-list";

const dummyCourses = [
    {
        id: "1",
        name: "Introduction to Programming",
        description: "A beginner's guide to programming concepts.",
        difficulty: "Beginner",
        duration: 8,
        owner_id: "user123",
        price: 49.99,
        discount: 10,
        profile_picture: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
        isPublished: true,
    },
    {
        id: "2",
        name: "Data Structures and Algorithms",
        description: "Learn about data structures and algorithmic techniques.",
        difficulty: "Intermediate",
        duration: 12,
        owner_id: "user456",
        price: 79.99,
        discount: 15,
        profile_picture: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
        isPublished: true,
    },
    {
        id: "2",
        name: "Data Structures and Algorithms",
        description: "Learn about data structures and algorithmic techniques.",
        difficulty: "Intermediate",
        duration: 12,
        owner_id: "user456",
        price: 79.99,
        discount: 15,
        profile_picture: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
        isPublished: true,
    },
    {
        id: "2",
        name: "Data Structures and Algorithms",
        description: "Learn about data structures and algorithmic techniques.",
        difficulty: "Intermediate",
        duration: 12,
        owner_id: "user456",
        price: 79.99,
        discount: 15,
        profile_picture: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
        isPublished: true,
    },
    {
        id: "2",
        name: "Data Structures and Algorithms",
        description: "Learn about data structures and algorithmic techniques.",
        difficulty: "Intermediate",
        duration: 12,
        owner_id: "user456",
        price: 79.99,
        discount: 15,
        profile_picture: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
        isPublished: true,
    },
    {
        id: "2",
        name: "Data Structures and Algorithms",
        description: "Learn about data structures and algorithmic techniques.",
        difficulty: "Intermediate",
        duration: 12,
        owner_id: "user456",
        price: 79.99,
        discount: 15,
        profile_picture: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
        isPublished: true,
    },
]  

const CourseReviewSection = () => {
    const {tutor} = useContext(ProfileContext);
    const [courses, setCourses] = useState<Course[]>(dummyCourses);
    useEffect(() => {
        
    },[]);
    
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