"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Video } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getLessons, getTutorList } from "@/actions/courses";
import { LessonItem } from "./lesson-item";
import { TutorItem } from "./tutor-item";
import { toast } from "react-toastify";

interface CourseSectionProps {
  course: Course;
  review?: any;
}

export function CourseSection({ course, review }: CourseSectionProps) {
  const [lessons, setLessons] = useState<Lesson[]>();
  const [tutorList, setTutorList] =
    useState<{ tutor_id: string; profit_rate: number }[]>();

  useEffect(() => {
    getLessons(course.id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setLessons(res.data.lessons);
        }
      }
    });
    getTutorList(course.id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setTutorList(res.data.tutor_list);
        }
      }
    });
  }, []);
  if (lessons === undefined || tutorList === undefined) {
    return <div>Loading... lesson and tutor</div>;
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="tutor">Tutor</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <div className="text-gray-500 text-sm">
                  {course.description}
                </div>
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-semibold">Curriculum</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-row items-center space-x-2">
                      <div className="text-sm text-gray-500">
                        {lessons.length} lessons
                      </div>
                    </div>
                  </div>
                </div>
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Accordion type="single" collapsible className="w-full">
                {lessons.map((lesson, index) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                  />
                ))}
              </Accordion>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tutor">
          <Card>
            <CardHeader>
              <CardTitle>Tutor ({tutorList.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col">
                {tutorList.map((tutorId) => {
                  return (
                    <TutorItem
                      key={tutorId.tutor_id}
                      tutor_id={tutorId.tutor_id}
                    />
                  );
                })}
              </div>
            </CardContent>
            <CardFooter></CardFooter>
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
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Omar M.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-yellow-500">★★★★★</span> 5.0
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Great Course!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
