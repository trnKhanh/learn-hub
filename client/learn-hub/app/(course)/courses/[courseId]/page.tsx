import { redirect } from "next/navigation";

const CourseIdLayout = ({
    params
}: {
    params: { courseId: string; }
}) => {
    return redirect(`/courses/${params.courseId}/overview`);
}

export default CourseIdLayout;