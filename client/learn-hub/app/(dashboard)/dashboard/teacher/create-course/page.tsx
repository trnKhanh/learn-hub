"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";

const courseFormSchema = z.object({
    name: z.string().min(1, {
        message: "Title is required",
    }),

    description: z.string().min(1, {
        message: "Description is required",
    }),

    difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"],{
        invalid_type_error: "Select difficulty level",
        required_error: "Difficulty level is required",
    }),

    duration: z.number().min(0, {
        message: "Duration is required",
    }),

    price: z.number().min(0, {
        message: "Price is required",
    }),

    discount: z.number().min(0, {
        message: "Discount is required",
    }),
})

type courseFormValues = z.infer<typeof courseFormSchema>

const defaultValues: Partial<courseFormValues> = {
    name: "",
    description: "",
    difficulty: "BEGINNER",
    duration: 0,
    price: 0,
    discount: 0,
}

const CreatePage = () => {
    const { toast } = useToast();

    const router = useRouter();
    const form = useForm<courseFormValues>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: defaultValues,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = () => {
        toast({
            title: form.getValues("name"),
            description: "Your course has been created successfully",
        })
        {/*try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast({
                title: "You created course successfully",
            })
        } catch {
            toast({
                title: "Something went wrong",
            })
        }*/}
    }

    return ( 
        <div className="p-6 space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-lg">Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your course title" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public course title. You can only change this once every 30 days. You should choose the name that suits the course most.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-lg">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about your course"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You should give the overview about the course, what you will teach, who will learn, etc.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="difficulty"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-lg">Difficulty</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                        <select
                                            className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            "w-[200px] appearance-none bg-transparent font-normal"
                                            )}
                                            {...field}
                                        >
                                            <option value="BEGINNER">BEGINNER</option>
                                            <option value="INTERMEDIATE">INTERMEDIATE</option>
                                            <option value="ADVANCED">ADVANCED</option>
                                        </select>
                                        </FormControl>
                                        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                    </div>
                                    <FormDescription>
                                        Set the difficulty level of your course.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-lg">Duration</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <Input placeholder="Duration" {...field} />
                                        </FormControl>
                                        <p className="absolute right-7 top-1.5 opacity-50">DAYS</p>
                                    </div>
                                    <FormDescription>
                                        Set the difficulty level of your course.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-lg">Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Course Price" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        How much does your course cost?
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-lg">Discount</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Course Discount" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        How much discount does your course have?
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" disabled={!isValid || isSubmitting}>Create Course</Button>
                        </div>
                </form>
            </Form>
        </div>
    );
}

export default CreatePage;