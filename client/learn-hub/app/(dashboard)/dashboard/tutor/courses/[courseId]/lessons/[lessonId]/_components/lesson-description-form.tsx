"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { LessonEditContext } from "../lesson-provider";
import { updateLesson } from "@/actions/lessons";


const formSchema = z.object({
    description: z.string().min(1),
});

export const LessonDescriptionForm = () => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const {lesson, setLesson} = useContext(LessonEditContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: lesson?.name || ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await updateLesson(lesson?.course_id, lesson?.id, values);
            if (res && res.status === 200) {
                setLesson(res.data.lesson);
                toast.success("Lessons updated");
            }
            toggleEdit();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Lesson description
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
                <>Cancel</>
            ) : (
                <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit description
                </>
            )}
            </Button>
        </div>
        {!isEditing && (
            <div className={cn(
            "text-sm mt-2",
                !lesson?.name && "text-slate-500 italic"
            )}>
            {!lesson?.name && "No description"}
            {lesson?.name && (
                <Preview
                value={lesson?.name}
                />
            )}
            </div>
        )}
        {isEditing && (
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
            >
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Editor
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex items-center gap-x-2">
                <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                >
                    Save
                </Button>
                </div>
            </form>
            </Form>
        )}
        </div>
    )
}