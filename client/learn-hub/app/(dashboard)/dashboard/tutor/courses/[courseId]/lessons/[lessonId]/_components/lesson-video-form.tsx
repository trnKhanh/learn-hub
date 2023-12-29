"use client";

import * as z from "zod";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { uploadVideo } from "./video-handler";
import { LessonEditContext } from "../lesson-provider";
import toast from "react-hot-toast";

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const LessonVideoForm = () => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const {lesson, setLesson} = useContext(LessonEditContext);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (lesson !== undefined) {
                const res = await uploadVideo(values.videoUrl, lesson?.course_id, lesson?.id, lesson?.assetId);
                if (res && res.status) {
                    toast.success(res.data.message);
                    setLesson(res.data.lesson);
                }
            }
        } catch (err) {
            toast.error("something went wrong!");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Chapter video
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                <>Cancel</>
            )}
            {!isEditing && !lesson?.videoUrl && (
                <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a video
                </>
            )}
            {!isEditing && lesson?.videoUrl && (
                <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit video
                </>
            )}
            </Button>
        </div>
        {!isEditing && (
            !lesson?.videoUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <Video className="h-10 w-10 text-slate-500" />
            </div>
            ) : (
            <div className="relative aspect-video mt-2">
                <MuxPlayer
                    playbackId={lesson?.playbackId || ""}
                />
            </div>
            )
        )}
        {isEditing && (
            <div>
            <FileUpload
                endpoint="chapterVideo"
                onChange={(url) => {
                    if (url) {
                        onSubmit({ videoUrl: url });
                    }
                }}
            />
            <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
            </div>
            </div>
        )}
        {lesson?.videoUrl && !isEditing && (
            <div className="text-xs text-muted-foreground mt-2">
            Videos can take a few minutes to process. Refresh the page if video does not appear.
            </div>
        )}
        </div>
    )
}