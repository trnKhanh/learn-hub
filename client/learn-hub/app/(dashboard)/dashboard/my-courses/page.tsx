import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_component/info-card";

import {getAllCourses} from "@/actions/courses";

import { CoursesList } from "@/components/courses-list";

export default async function MyCourses() {

    const courses = await getAllCourses();

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
            <CoursesList
                isHorizontal={true}
                items={...courses}
            />
        </div>
    )
}
