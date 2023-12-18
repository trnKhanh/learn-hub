import { redirect } from "next/navigation";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getCourses } from "@/actions/courses";

const CoursesPage = async () => {

    const courses = await getCourses();

    return ( 
    <div className="p-6">
        <DataTable columns={columns} data={courses} />
    </div>
    );
}

export default CoursesPage;
