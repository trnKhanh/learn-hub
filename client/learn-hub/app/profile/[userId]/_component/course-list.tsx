"use client";

import {CourseCard} from "@/components/course-card";

interface CoursesListProps {
    items: Course[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <CourseCard id={item.id}/> 
                    // <CourseCard
                    //     course={item}
                    //     // key={item.id}
                    //     // id={item.id}
                    //     // title={item.name!}
                    //     // imageUrl={item.profile_picture!}
                    //     // chaptersLength={1}
                    //     // price={item.price!}
                    //     // progress={null}
                    //     // category={""}
                    // />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No courses found
                </div>
            )}
        </div>
    )
}