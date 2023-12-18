"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FileText, Video } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface CourseSectionProps {
    description?: string,
    curriculum?: Lesson[],
    documents?: Documents[],
    video?: VideoData[],
    instructor?: User[],
    review?: any,
}


export function CourseSection({
    description,
    curriculum,
    documents,
    video,
    instructor,
    review,
}: CourseSectionProps) {
    return (
        <div className="w-full">
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <div className="text-gray-500 text-sm">{description}</div>
                    </div>   
                </CardContent>
                <CardFooter>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="curriculum">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="text-3xl font-semibold">
                                        Curriculum
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-row items-center space-x-2">
                                        <div className="text-sm text-gray-500">{curriculum.length} lessons</div>
                                        <div className="flex flex-row items-center space-x-1">
                                            <Video className="h-5 w-5"/>
                                            <div className="text-sm text-gray-500">{documents.length} lessons</div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </CardTitle>
                        <CardDescription>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Accordion type="single" collapsible className="w-full">
                            {curriculum.map((lesson, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{lesson.name}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col space-y-2">
                                            {documents.filter(doc => doc.lesson_id === lesson.id)
                                                    .map((filteredDoc) => (
                                                <div className="flex flex-row items-center space-x-2">
                                                    <FileText className="h-5 w-5"/>
                                                    <div className="text-sm text-gray-500">{filteredDoc.name}</div>
                                                </div>
                                            ))}
                                            {video.filter(vd => vd.lesson_id === lesson.id)
                                                    .map((filteredVd) => (
                                                <div className="flex flex-row items-center space-x-2">
                                                    <Video className="h-5 w-5"/>
                                                    <div className="text-sm text-gray-500">Video Lecture {lesson.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="instructor">
                <Card>
                <CardHeader>
                    <CardTitle>Instructor ({instructor.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex flex-col">
                        {instructor.map(instructor => (
                            <Link href={`/instructor/${instructor.id}`}>
                                <div className="flex flex-row">
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage src={instructor.profile_picture}/>
                                            <AvatarFallback>OM</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{instructor.full_name}</p>
                                            <p className="text-sm text-muted-foreground">{instructor.email}</p>
                                            <p className="text-sm text-muted-foreground">{instructor.biography}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="review">
                <Card>
                    <CardHeader>
                        <CardTitle>Review</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png"/>
                                        <AvatarFallback>OM</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium leading-none">Omar M.</p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="text-yellow-500">★★★★★</span> 5.0
                                        </p>
                                        <p className="text-sm text-muted-foreground">Great Course!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        </div>
    )
}
