"use client";

import { getCourse, removeCart } from "@/actions/courses";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserThumbnail } from "../../_components/user-thumbnail";
import { getTutor } from "@/actions/tutors";
import { DashboardSectionButton } from "../../_components/dashboard-section";
import { Info, Trash2 } from "lucide-react";
import { CartContext } from "../cart-provider";

interface CourseThumbnailProps {
  course_id: string;
}

export const CourseThumbnail = ({ course_id }: CourseThumbnailProps) => {
  const { isUpdating, setIsUpdating } = useContext(CartContext);
  const [course, setCourse] = useState<Course>();
  const [tutor, setTutor] = useState<Tutor>();
  useEffect(() => {
    getCourse(course_id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourse(res.data.course);
          getTutor(res.data.course.owner_id).then((res) => {
            if (res && res.status == 200) {
              setTutor(res.data.tutor);
            }
          });
        }
      }
    });
  }, []);
  if (!course || !tutor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex p-2 items-center transition ease-in-out duration-300 hover:scale-105 hover:bg-slate-100">
      <img
        className="w-24 h-24 bg-slate-500 mr-2"
        src={course.profile_picture}
      />
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <span className="text-slate-400 mr-2">Provided by:</span>
          <span className="text-slate-500">
            {tutor.full_name || tutor.username}{" "}
          </span>
        </div>
        <span className="font-medium text-xl"> {course.name}</span>
        {course.discount == null ? (
          <span className="text-sky-400 font-[500] text-xl">
            ${course.price}
          </span>
        ) : (
          <div className="flex items-center">
            <span className="text-sky-400 font-[500] mr-2 text-xl">
              ${course.price * (1 - course.discount)}
            </span>
            <span className="text-slate-400 line-through">${course.price}</span>
          </div>
        )}
      </div>
      <div className="ml-auto flex flex-col space-y-2">
        <DashboardSectionButton
          href={`/course/${course.id}`}
          icon={Info}
          label={"Info"}
          hover={true}
        />
        <DashboardSectionButton
          icon={Trash2}
          label={"Remove"}
          hover={true}
          onClick={async (e) => {
            setIsUpdating(true);
            await removeCart(course.id);
            setIsUpdating(false);
          }}
        />
      </div>
    </div>
  );
};
