"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { LessonEditContext } from "../lesson-provider";
import { createDocument, deleteDocument } from "@/actions/documents";

const formSchema = z.object({
    file_path: z.string().min(1, {
        message: "File path is required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const LessonDocumentForm = ({
    courseId,
    lessonId
} : {courseId: string, lessonId: string}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const {documents, setDocuments} = useContext(LessonEditContext);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            const res = await createDocument(courseId, lessonId, values);
            if (res) {
                if (res.status == 201) {
                    toast.success(res.data.message);
                    console.log("hello");
                    const newDocuments = documents ? [...documents] : [];
                    newDocuments.push(res.data.document);
                    console.log(newDocuments);
                    setDocuments(newDocuments);
                    toggleEdit();
                } else {
                    toast.error(res.data.message);
                }
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            if (documents !== undefined) {
                const res = await deleteDocument(documents[+id].course_id, documents[+id].lesson_id, documents[+id].id);
                if (res && res.status == 200) {
                    const newDocuments = documents.filter((document) => document.id !== id);
                    setDocuments(newDocuments);
                    toast.success("updated documents!");
                }
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Lesson attachments
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                <>Cancel</>
            )}
            {!isEditing && (
                <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a file
                </>
            )}
            </Button>
        </div>
        {!isEditing && (
            <>
            {documents?.length === 0 && (
                <p className="text-sm mt-2 text-slate-500 italic">
                No attachments yet
                </p>
            )}
            {documents?.length !== undefined && documents.length > 0 && (
                <div className="space-y-2">
                {documents.map((document) => (
                    <div
                    key={document.id}
                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                    >
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1">
                        {document.name}
                    </p>
                    {deletingId === document.id && (
                        <div>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    )}
                    {deletingId !== document.id && (
                        <Button
                        onClick={() => onDelete(document.id)}
                        className="ml-auto hover:opacity-75 transition"
                        >
                        <X className="h-4 w-4" />
                        </Button>
                    )}
                    </div>
                ))}
                </div>
            )}
            </>
        )}
        {isEditing && (
            <div>
                <FileUpload
                    endpoint="courseAttachment"
                    onChange={(url) => {
                        if (url) {
                            onSubmit({ file_path: url, name: "Note Lesson " + lessonId});
                        }
                    }}
                />
            <div className="text-xs text-muted-foreground mt-4">
                Add anything your students might need to complete the course.
            </div>
            </div>
        )}
        </div>
    )
}