"use client";

import { Trash } from "lucide-react";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { deleteLesson, updateLesson } from "@/actions/lessons";
import { LessonEditContext } from "../lesson-provider";

export const LessonActions = ({disabled}: {disabled : boolean}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {lesson, setLesson} = useContext(LessonEditContext);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (lesson?.isPublished) {
                const res = await updateLesson(lesson?.course_id, lesson?.lesson_id, {isPublished: false});
                if (res && res.status === 200) {
                    toast.success(res.data.message);
                    const newLesson = lesson;
                    if (newLesson !== undefined) {
                        newLesson.isPublished = false;
                        setLesson(newLesson);
                    }
                    toast.success("Chapter unpublished");
                } else {
                    toast.error("Something went wrong");
                }
            } else {
                const res = await updateLesson(lesson?.course_id, lesson?.lesson_id, {isPublished: true});
                if (res && res.status === 200) {
                    toast.success(res.data.message);
                    const newLesson = lesson;
                    if (newLesson !== undefined) {
                        newLesson.isPublished = true;
                        setLesson(newLesson);
                    }
                    toast.success("Chapter published");
                } else {
                    toast.error("Something went wrong");
                }
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    
    const onDelete = async () => {
        try {
            setIsLoading(true);

            const res = await deleteLesson(lesson?.course_id, lesson?.lesson_id);
            if (res && res.status === 200) {
                toast.success(res.data.message);
            } else {
                toast.error("Something went wrong");
            }

            toast.success("Chapter deleted");
            router.refresh();
            router.push(`/tutor/courses/${lesson?.course_id}`);
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
        <Button
            onClick={onClick}
            disabled={disabled || isLoading}
            variant="outline"
            size="sm"
        >
            {lesson?.isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirmModal onConfirm={onDelete}>
            <Button size="sm" disabled={isLoading}>
            <Trash className="h-4 w-4" />
            </Button>
        </ConfirmModal>
        </div>
    )
}