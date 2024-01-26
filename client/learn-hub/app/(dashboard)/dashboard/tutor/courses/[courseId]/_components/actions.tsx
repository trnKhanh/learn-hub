"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { updateCourse } from "@/actions/courses";
import { EditContext } from "../edit-provider";

interface ActionsProps {
    course: Course;
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

export const Actions = ({
    course,
    disabled,
    courseId,
    isPublished
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const {setCourse} = useContext(EditContext)

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                const res = await updateCourse(courseId.toString(), {isPublished: false});
                if (res && res.status === 200) {
                    toast.success("Course unpublished");
                    setCourse(res.data.courses[0]);
                } else {
                    toast.error(res?.data?.message || "Something went wrong");
                }
            } else {
                const res = await updateCourse(courseId.toString(), {isPublished: true});
                if (res && res.status === 200) {
                    toast.success("Course published");
                    confetti.onOpen();
                    setCourse(res.data.courses[0]);
                } else {
                    toast.error(res?.data?.message || "Something went wrong");
                }
            }

            // const res = await updateCourse(courseId.toString(), {isPublished: !isPublished});
            // if (res && res.status === 200) {
            //     if (isPublished) {
            //         toast.success("Course unpublished");
            //     }
            //     else {
            //         toast.success("Course published");
            //         confetti.onOpen();
            //     }
            //     setCourse(res.data.courses[0]);
            // } else {
            //     toast.error(res?.data?.message || "Something went wrong");
            // }

            // if (isPublished) {
            //     //await axios.patch(`/api/courses/${courseId}/unpublish`);
            //     toast.success("Course unpublished");
            // } else {
            //     //await axios.patch(`/api/courses/${courseId}/publish`);
            //     toast.success("Course published");
            //     confetti.onOpen();
            // }

            // router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    
    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}`);

            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses`);
            } catch {
            toast.error("Something went wrong");
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
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}