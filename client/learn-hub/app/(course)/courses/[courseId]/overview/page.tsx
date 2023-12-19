import { profile } from "console";
import { CourseOverviewCard } from "./_components/overview-card";
import { CourseSection } from "./_components/overview-section";

const Lessons: Lesson[] = [
    {
        id: 1,
        course_id: 1,
        name: "Introduction to Basics",
        isPublished: true,
        isFree: true,
    },
    {
        id: 2,
        course_id: 1,
        name: "Intermediate Concepts",
        isPublished: true,
        isFree: false,
    },
    {
        id: 3,
        course_id: 1,
        name: "Advanced Techniques",
        isPublished: true,
        isFree: false,
    },
];

const dummyDocuments: Documents[] = [
    {
        id: 1,
        course_id: 1,
        lesson_id: 1,
        name: "Introduction Document",
        file_path: "/documents/intro_doc.pdf",
    },
    {
        id: 2,
        course_id: 1,
        lesson_id: 2,
        name: "Intermediate Document",
        file_path: "/documents/intermediate_doc.pdf",
    },
    {
        id: 3,
        course_id: 1,
        lesson_id: 2,
        name: "Advanced Document",
        file_path: "/documents/advanced_doc.pdf",
    },
];

const dummyVideoData: VideoData[] = [
    {
        assetId: "asset1",
        playbackId: "playback1",
        lesson_id: 1,
        course_id: 1,
    },
    {
        assetId: "asset2",
        playbackId: "playback2",
        lesson_id: 2,
        course_id: 1,
    },
    {
        assetId: "asset3",
        playbackId: "playback3",
        lesson_id: 2,
        course_id: 1,
    },
];

const dummyInstructors: User[] = [
    {
        id: "1",
        email: "user1@example.com",
        username: "user1",
        full_name: "User One",
        date_of_birth: "1990-01-01",
        phone_number: "1234567890",
        institute: "Some Institute",
        area_of_study: "Computer Science",
        profile_picture: "user1.jpg",
        biography: "I am User One. I love coding and learning new technologies.",
    },
    {
        id: "2",
        email: "user2@example.com",
        username: "user2",
        full_name: "User Two",
        date_of_birth: "1995-02-02",
        phone_number: "9876543210",
        institute: "Another Institute",
        area_of_study: "Engineering",
        profile_picture: "user2.jpg",
        biography: "I am User Two. I enjoy exploring the world of science and innovation.",
    },
];

const profile_picture = "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg";

const Overview = () => {
    
    return (
        <div className="flex items-start justify-between gap-5 mt-20 ml-20 mr-20 mb-20">
            <div className="flex flex-col w-full">
                <h2 className="text-4xl text-primary font-bold">Advanced Operating System</h2>
                <div className="relative w-full h-96 mt-10">
                    <img
                        src={profile_picture}
                        className="w-full h-full object-cover rounded-2xl"
                        alt="Course Cover"
                    />
                </div>
                <div className="mt-10 w-full">
                    <CourseSection description={"This is a description"} curriculum={Lessons} documents={dummyDocuments} video={dummyVideoData} instructor={dummyInstructors}/>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <CourseOverviewCard price={14} duration={120} difficulty={"BEGINNER"} language={"English"} discount={0.5} studentEnrolled={450}/>
            </div>
        </div>
    )
}

export default Overview;