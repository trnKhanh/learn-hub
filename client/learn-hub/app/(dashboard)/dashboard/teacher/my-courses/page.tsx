import { redirect } from "next/navigation";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getCourses } from "@/actions/course";

const CoursesPage = async () => {

    const courses = await getCourses();
    console.log(courses);

    return ( 
    <div className="p-6">
        <DataTable columns={columns} data={courses} />
    </div>
    );
}

export default CoursesPage;