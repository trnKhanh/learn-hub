"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState, useContext } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { updateCourse } from "@/actions/courses";
import { EditContext } from "../edit-provider";
import { toast } from "react-toastify";

const formSchema = z.object({
    profile_picture: z.string().min(1, {
        message: "Image is required",
    }),
});

export const ImageForm = () => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const {course, setCourse} = useContext(EditContext);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        const res = await updateCourse(course.id.toString(), values);
        if (res && res.status === 200) {
            setCourse(res.data.courses[0]);
            toast.success(res.data.message);
        } else {
            toast.error("something went wrong");
        }
        toggleEdit();
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Course image
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                <>Cancel</>
            )}
            {!isEditing && !course.profile_picture && (
                <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
                </>
            )}
            {!isEditing && course.profile_picture && (
                <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit image
                </>
            )}
            </Button>
        </div>
        {!isEditing && (
            !course.profile_picture ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
            ) : (
            <div className="relative aspect-video mt-2">
                <Image
                alt="Upload"
                fill
                className="object-cover rounded-md"
                src={course.profile_picture}
                />
            </div>
            )
        )}
        {isEditing && (
            <div>
            <FileUpload
                endpoint="courseImage"
                onChange={(url) => {
                        if (url) {
                            onSubmit({ profile_picture: url });
                        }
                    }
                }
            />
            <div className="text-xs text-muted-foreground mt-4">
                16:9 aspect ratio recommended
            </div>
            </div>
        )}
        </div>
    )
}