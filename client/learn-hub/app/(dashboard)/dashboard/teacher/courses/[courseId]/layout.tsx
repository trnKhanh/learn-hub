import { EditContextProvider } from "./edit-provider";

const CourseIdLayout = ({
    children, params
} : {children : React.ReactNode, params : {courseId : string}}) => {
    return ( 
        <EditContextProvider params={params}>
            {children}
        </EditContextProvider>
    );
}

export default CourseIdLayout;