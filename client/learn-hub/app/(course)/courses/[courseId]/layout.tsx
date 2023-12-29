import { CourseProvider } from "./course-provider";

const CourseLayout = async ({
    children,
    params,
} : {
    children : React.ReactNode;
    params: {courseId: string};
}) => {
    return ( 
        <CourseProvider params={params}>
            {children}
        </CourseProvider>
    );
}

export default CourseLayout;