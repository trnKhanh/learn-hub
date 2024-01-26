"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useContext, useState } from "react";

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
import { formatPrice } from "@/lib/format";
import { updateCourse } from "@/actions/courses";
import { EditContext } from "../edit-provider";
import { toast } from "react-toastify";

interface PriceFormProps {
    price: number;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number(),
});

export const PriceForm = ({
    //initialData,
    price,
    courseId
}: PriceFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const { setCourse } = useContext(EditContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: price || undefined,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        const res = await updateCourse(courseId.toString(), values);
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
            Course price
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
                <>Cancel</>
            ) : (
                <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit price
                </>
            )}
            </Button>
        </div>
        {!isEditing && (
            <p className={cn(
            "text-sm mt-2",
            !price && "text-slate-500 italic"
            )}>
            {price
                ? formatPrice(price)
                : "No price"
            }
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
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input
                        type="number"
                        step="0.01"
                        disabled={isSubmitting}
                        placeholder="Set a price for your course"
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