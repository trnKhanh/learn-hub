"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  lessonId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  courseId,
  lessonId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  // const onEnd = async () => {
  //     try {
  //     if (completeOnEnd) {
  //         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
  //         isCompleted: true,
  //         });

  //         if (!nextChapterId) {
  //             confetti.onOpen();
  //         }

  //         toast.success("Progress updated");
  //         router.refresh();

  //         if (nextChapterId) {
  //             router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
  //         }
  //     }
  //     } catch {
  //         toast.error("Something went wrong");
  //     }
  // }
  // return (
  //   <div>
  //   <ReactPlayer
  //     url={`http://localhost:3001/courses/${courseId}/lessons/${lessonId}/video`}
  //     controls
  //   />
  //   </div>
  // );

  return (
    <div className="">
      {isLocked ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      ) : (
        <ReactPlayer
             className="mx-auto"
          url={`http://localhost:3001/courses/${courseId}/lessons/${lessonId}/video`}
          controls
        ></ReactPlayer>
      )}
    </div>
  );
};
