"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useToast } from "@/components/ui/use-toast";
import { updateCourse } from "@/actions/courses";

interface ImageFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

export const ImageForm = ({
    initialData,
    courseId
}: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();
    const { toast } = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await updateCourse(courseId, values);
            toggleEdit();
            router.refresh();
        } catch {
            toast({
                description: "Your course has been created successfully",
            })
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Course image
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                <>Cancel</>
            )}
            {!isEditing && !initialData.profile_picture && (
                <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
                </>
            )}
            {!isEditing && initialData.profile_picture && (
                <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit image
                </>
            )}
            </Button>
        </div>
        {!isEditing && (
            !initialData.profile_picture ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
            ) : (
            <div className="relative aspect-video mt-2">
                <Image
                alt="Upload"
                fill
                className="object-cover rounded-md"
                src={initialData.profile_picture}
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
                    onSubmit({ imageUrl: url });
                }
                }}
            />
            <div className="text-xs text-muted-foreground mt-4">
                16:9 aspect ratio recommended
            </div>
            </div>
        )}
        </div>
    )
}