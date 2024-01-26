"use client";

import { getDocuments } from "@/actions/courses";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Video } from "lucide-react";
import { useEffect, useState } from "react";

export const LessonItem = ({
  lesson,
  index,
}: {
  lesson: Lesson;
  index: number;
}) => {
  const [documents, setDocuments] = useState<CourseDocument[]>();

  console.log("Lesson: ", lesson)
  useEffect(() => {
    getDocuments(lesson.course_id, lesson.id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setDocuments(res.data.documents);
        }
      }
    });
  }, []);

  if (!documents) {
    return <div>Loading...</div>
  }

  return (
    <AccordionItem value={`item-${index}`}>
      <AccordionTrigger>{lesson.name}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="flex flex-row items-center space-x-2">
              <FileText className="h-5 w-5" />
              <div className="text-sm text-gray-500">{doc.name}</div>
            </div>
          ))}

          <div className="flex flex-row items-center space-x-2">
            <Video className="h-5 w-5" />
            <div className="text-sm text-gray-500">
              {lesson.name}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
