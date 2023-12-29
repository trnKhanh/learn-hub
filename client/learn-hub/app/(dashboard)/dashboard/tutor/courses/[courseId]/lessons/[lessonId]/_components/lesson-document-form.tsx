"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { LessonEditContext } from "../lesson-provider";
import { createDocument, deleteDocument } from "@/actions/documents";

const formSchema = z.object({
    url: z.string().min(1),
});

export const LessonDocumentForm = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();
    const {documents, setDocuments} = useContext(LessonEditContext)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (documents !== undefined) {
                const res = await createDocument(documents[0].course_id, documents[0].lesson_id, values);
                if (res && res.status == 200) {
                    const newDocuments = documents;
                    newDocuments.push(res.data.document);
                    setDocuments(newDocuments);
                    toast.success(res.data.message);
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
                const res = await deleteDocument(documents[+id].course_id, documents[+id].lesson_id, documents[+id].document_id);
                if (res && res.status == 200) {
                    const newDocuments = documents.filter((document) => document.document_id !== id);
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
            Course attachments
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
                    key={document.document_id}
                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                    >
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1">
                        {document.name}
                    </p>
                    {deletingId === document.document_id && (
                        <div>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    )}
                    {deletingId !== document.document_id && (
                        <Button
                        onClick={() => onDelete(document.document_id)}
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
                            onSubmit({ url: url });
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