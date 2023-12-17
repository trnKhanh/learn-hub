const CourseLayout = async ({
    children,
    params,
} : {
    children : React.ReactNode;
    params: {courseId: string};
}) => {
    return ( 
        <div>
            {children}
        </div>
    );
}

export default CourseLayout;