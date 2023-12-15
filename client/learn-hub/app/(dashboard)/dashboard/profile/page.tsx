"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"
import { useFieldArray, useForm } from "react-hook-form"
import { format } from "date-fns"

import * as z from "zod"
import { Calendar } from "@/components/ui/calendar"

const profileFormSchema = z.object({
    username: z.string()
            .min(2, {
            message: "Username must be at least 2 characters.",
            })
            .max(30, {
            message: "Username must not be longer than 30 characters.",
            }),
    email: z
            .string({
            required_error: "Please select an email to display.",
            })
            .email(),
    bio: z.string().max(160).min(4),
    urls: z
        .array(
        z.object({
            value: z.string().url({ message: "Please enter a valid URL." }),
        })
        )
        .optional(),
    dob: z.date({
        required_error: "A date of birth is required.",
        }),
    language: z.string({
    required_error: "Please select a language.",
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    bio: "I own a computer.",
    urls: [
        { value: "https://nguyentienthanh.com" },
        { value: "http://twitter.com/thanhtiennguyen" },
    ],
}

const Profile = () => {

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })
    
    const { fields, append } = useFieldArray({
        name: "urls",
        control: form.control,
    })
    
    function onSubmit(data: ProfileFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
        })
    }

    return (
        <div className="p-6 space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym. You can only change this once every 30 days.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage verified email addresses in your{" "}
                                <Link href="/examples/forms">email settings</Link>.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your age.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and organizations to
                                link to them.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        {fields.map((field, index) => (
                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`urls.${index}.value`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                        URLs
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        Add links to your website, blog, or social media profiles.
                                    </FormDescription>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append({ value: "" })}
                        >
                            Add URL
                        </Button>
                    </div>
                    <Button type="submit">Update profile</Button>
                </form>
            </Form>
        </div>
    );
}

export default Profile;