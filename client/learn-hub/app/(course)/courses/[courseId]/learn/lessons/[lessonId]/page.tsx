import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_component/video-player";
import { CourseEnrollButton } from "./_component/course-enroll-button";
import { CourseProgressButton } from "./_component/course-progress-button";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../../../course-provider";
import { LearnContext } from "../../learn-provider";
import { getAllDocuments } from "@/actions/documents";

const LessonIdPage = async ({
    params
}: {
    params: { courseId: string; lessonId: string }
}) => {
    const { course } = useContext(CourseContext);
    const { isPurchased } = useContext(CourseContext);

    const { lessons } = useContext(LearnContext);
    const lesson = lessons?.find((lesson) => lesson.id === params.lessonId);
    const nextLesson = lessons?.find((lesson) => lesson.id === (parseInt(params.lessonId) + 1).toString());

    const [ documents, setDocuments ] = useState<CourseDocument[]>([]);

    useEffect(() => {
        getAllDocuments( params.courseId, params.lessonId).then((res) => {
            if (res) {
                if (res.status == 200) {
                    setDocuments(res.data.documents);
                }
            }
        });
    }, []);

    if (!lesson || !course) {
        return redirect("/")
    }

    const isLocked = !lesson.isFree && !isPurchased;
    const completeOnEnd = !!isPurchased && !lesson.studentProgress?.finished_at;

    return ( 
        <div>
            {lesson.studentProgress?.finished_at && (
                <Banner
                    variant="success"
                    label="You already completed this lesson."
                />
            )}
            {isLocked && (
                <Banner
                    variant="warning"
                    label="You need to purchase this course to watch this lesson."
                />
            )}
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
            <div className="p-4">
                {/*<VideoPlayer
                    chapterId={params.lessonId}
                    title={lesson.name}
                    courseId={params.courseId}
                    nextChapterId={nextLesson?.id}
                    playbackId={videoData?.playbackId}
                    isLocked={isLocked}
                    completeOnEnd={completeOnEnd}
                />*/}
            </div>
            <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2">
                    {lesson.name}
                </h2>
                {isPurchased ? (
                    <CourseProgressButton
                        lessonId={params.lessonId}
                        courseId={params.courseId}
                        nextLessonId={nextLesson?.id}
                        isCompleted={!!lesson.studentProgress?.finished_at}
                    />
                ) : (
                    <CourseEnrollButton
                        courseId={params.courseId}
                        price={course.price!}
                    />
                )}
            </div>
            <Separator />
            <div>
                <Preview value={lesson.name!} />
            </div>
            {!!documents.length && (
                <>
                <Separator />
                <div className="p-4">
                    {documents.map((document) => (
                    <a 
                        href={document.file_path}
                        target="_blank"
                        key={document.document_id}
                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline" rel="noreferrer"
                    >
                        <File />
                        <p className="line-clamp-1">
                        {document.name}
                        </p>
                    </a>
                    ))}
                </div>
                </>
            )}
            </div>
        </div>
        </div>
    );
}

export default LessonIdPage;