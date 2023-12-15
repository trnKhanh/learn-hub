import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./my-courses/_component/info-card";

import {getCourses} from "@/actions/get-course";

import { CoursesList } from "@/components/courses-list";

export default async function Dashboard() {

    const courses = await getCourses();

    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                    icon={Clock}
                    label="In Progress"
                    numberOfItems={10}
                />
                <InfoCard
                    icon={CheckCircle}
                    label="Completed"
                    numberOfItems={10}
                    variant="success"
                />
            </div>
        </div>
    )
}