"use client";

import { redirect } from "next/navigation";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getCourseOfTutor } from "@/actions/courses";
import { useEffect, useState } from "react";

const CoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>();

    useEffect(() => {
        getCourseOfTutor().then((res) => {
            if (res && res.status === 200) {
                setCourses(res.data.courses);
            }
        })
    }, []);

    if (!courses) {
        return <div>Loading...</div>;
    }

    return ( 
    <div className="p-6">
        <DataTable columns={columns} data={courses} />
    </div>
    );
}

export default CoursesPage;
