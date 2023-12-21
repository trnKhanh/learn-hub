"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LessonEditContext } from "../lesson-provider";
import { updateLesson } from "@/actions/lessons";


const formSchema = z.object({
    title: z.string().min(1),
});

export const LessonTitleForm = () => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const {lesson, setLesson} = useContext(LessonEditContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: lesson?.name
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await updateLesson(lesson?.course_id, lesson?.lesson_id, values);
            if (res && res.status == 200) {
                setLesson(res.data.lesson);
                toast.success(res.data.message);
            }
            toggleEdit();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Chapter title
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
                <>Cancel</>
            ) : (
                <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit title
                </>
            )}
            </Button>
        </div>
        {!isEditing && (
            <p className="text-sm mt-2">
            {lesson?.name}
            </p>
        )}
        {isEditing && (
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
            >
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Introduction to the course'"
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