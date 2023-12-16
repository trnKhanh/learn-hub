import { getTutor } from "@/actions/tutors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRightIcon, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const CourseThumbnail = ({ course }: { course: Course }) => {
  const [owner, setOwner] = useState<Tutor>();
  useEffect(() => {
    getTutor(course.owner_id).then((res) => {
      if (res && res.status == 200) setOwner(res.data.tutor);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col  space-y-6 border-2 border-slate-100 rounded-lg p-6 transition ease-in-out hover:scale-110 hover:bg-slate-50 duration-300">
        <div className="relative">
          <img
            className="bg-red-200 grow w-60 h-60"
            src={course.profile_picture}
            alt={course.name}
          />
          <div className="flex items-center space-x-2 bg-slate-200 absolute top-0 right-0 p-1 border  text-slate-500">
            <Clock size={20}/> <span>{course.duration} days</span>
          </div>
        </div>
        <div className="flex">
          <span className="font-bold text-xl mr-auto">{course.name}</span>
          <ArrowUpRightIcon />
        </div>

        <div className="flex w-60 items-center">
          <div className="flex mr-auto items-center space-x-2 p-2">
            {owner && (
              <>
                <Avatar>
                  <AvatarImage src={owner.profile_picture} />
                  <AvatarFallback>{owner.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span>{owner.full_name || owner.username}</span>
              </>
            )}
          </div>
          <span className="text-fuchsia-700 font-bold text-lg">$ {course.price}</span>
        </div>
      </div>
    </div>
  );
};
