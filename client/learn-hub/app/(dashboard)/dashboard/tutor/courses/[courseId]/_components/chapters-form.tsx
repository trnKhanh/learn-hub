"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { ChaptersList } from "./chapters-list";
import { EditContext } from "../edit-provider";
import { createLesson, getAllLessonsOfCourseId } from "@/actions/lessons";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
    name: z.string().min(1),
});

export const ChaptersForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [created, setCreated] = useState(false);

    const toggleCreating = () => {
        setIsCreating((current) => !current);
    }

    const router = useRouter();
    const {course} = useContext(EditContext);

    const [lessons, setLessons] = useState<Lesson[]>();
    useEffect(() => {
        getAllLessonsOfCourseId(course?.id).then((res) => {
            if (res && res.status === 200) {
                console.log(res.data.lessons);
                setLessons(res.data.lessons);
            }
    })}, [created])

    if (!lessons) return (
        <div className="flex flex-row items-center justify-between">
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </div>
    )

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        createLesson(course?.id, values).then((res) => {
            console.log(res);
            if (res && res.status == 200) {
                toast.success(res.data.message);
                toggleCreating();
                //router.refresh();
                setCreated(true);
            } else {
                toast.error("Something went wrong");
            }
        });
    }

    const onReorder = async (updateData: { id: string; position: number }[]) => {
        try {
            setIsUpdating(true);
            
            //write code to update order of the lessons

            toast.success("Chapters reordered");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: string) => {
        router.push(`/dashboard/tutor/courses/${course?.id}/lessons/${id}`);
    }

    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
        {isUpdating && (
            <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
            </div>
        )}
        <div className="font-medium flex items-center justify-between">
            Course lessons
            <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
                <>Cancel</>
            ) : (
                <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a lesson
                </>
            )}
            </Button>
        </div>
        {isCreating && (
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
            >
                <FormField
                control={form.control}
                name="name"
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
                <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                >
                Create
                </Button>
            </form>
            </Form>
        )}
        {!isCreating && (
            <div className={cn(
            "text-sm mt-2",
            !lessons.length && "text-slate-500 italic"
            )}>
            {!lessons.length && "No chapters"}
            <ChaptersList
                onEdit={onEdit}
                onReorder={onReorder}
                items={lessons || []}
            />
            </div>
        )}
        {!isCreating && (
            <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
            </p>
        )}
        </div>
    )
}