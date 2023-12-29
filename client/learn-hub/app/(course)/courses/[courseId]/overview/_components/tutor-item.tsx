"use client";

import { getTutor } from "@/actions/tutors";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const TutorItem = ({ tutor_id }: { tutor_id: string }) => {
  const [tutor, setTutor] = useState<Tutor>();
  useEffect(() => {
    getTutor(tutor_id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setTutor(res.data.tutor);
        } else {
          toast.error(res.data.message);
        }
      }
    });
  }, []);

  if (!tutor) {
    return <Skeleton/>;
  }

  return (
    <Link href={`/tutors/${tutor_id}`}>
      <div className="flex flex-row">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={tutor.profile_picture} />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {tutor.full_name}
            </p>
            <p className="text-sm text-muted-foreground">{tutor.email}</p>
            <p className="text-sm text-muted-foreground">{tutor.biography}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
