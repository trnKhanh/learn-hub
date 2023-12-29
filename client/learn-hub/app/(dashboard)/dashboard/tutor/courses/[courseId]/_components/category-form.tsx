"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState, useContext, useEffect } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { getCategoriesOfCourseId } from "@/actions/category";
import { EditContext } from "../edit-provider";

interface CategoryFormProps {
    options: { label: string; value: string; }[]
};

const formSchema = z.object({
    categoryId: z.string()
});

export const CategoryForm = ({
    options
} : CategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const {course} = useContext(EditContext);
    const [categories, setCategories] = useState<Subject[]>([{
        id: "1",
        name: "Programming"
    }]);

    useEffect(() => {
        getCategoriesOfCourseId(course?.id).then((res) => {
            if (res && res.status === 200) {
                setCategories(res.data.subjects);
            }
        }
    )}, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: categories[0].id,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setCategories([{name: values.categoryId, id: values.categoryId}]);
    }

    const selectedOption = options.find((option) => option.value === categories[0].id);

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Course category
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
                <>Cancel</>
            ) : (
                <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit category
                </>
            )}
            </Button>
        </div>
        {!isEditing && (
            <p className={cn(
            "text-sm mt-2",
            !categories && "text-slate-500 italic"
            )}>
            {selectedOption?.label || "No category"}
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
                name="categoryId"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Combobox
                            options={...options}
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