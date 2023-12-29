"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState, useContext } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { EditContext } from "../edit-provider";
import { updateCourse } from "@/actions/courses";
import { toast } from "react-toastify";

interface DescriptionFormProps {
    description: string;
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

export const DescriptionForm = ({
    description,
}: DescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const {course, setCourse} = useContext(EditContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: description
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        const res = await updateCourse(course?.id.toString(), values);
        if (res && res.status === 200) {
            setCourse(res.data.courses[0]);
            toast.success(res.data.message);
        } else {
            toast.error("Something went wrong");
        }
        toggleEdit();
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Course description
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
            <p className={cn(
            "text-sm mt-2",
            !description && "text-slate-500 italic"
            )}>
            {description || "No description"}
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
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. 'This course is about...'"
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