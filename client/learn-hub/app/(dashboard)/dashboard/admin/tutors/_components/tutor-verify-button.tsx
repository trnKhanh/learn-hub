import { getTutorCV, updateTutorCV } from "@/actions/tutors";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShieldCheck, ShieldHalf, ShieldX } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TutorVerifyButtonProps {
  tutor_id: string;
}
export const TutorVerifyButton = ({ tutor_id }: TutorVerifyButtonProps) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NO_CV");
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    getTutorCV(tutor_id).then((data) => {
      if (data) {
        if (data.tutorCV) {
          setStatus(data.tutorCV.status);
        } else {
          setDescription("This tutor has not submitted a CV");
        }
      }
    });
  }, [isUpdating]);
  if (status == "NO_CV") {
    return (
      <div className="flex items-center bg-slate-300 text-slate-400 p-2 rounded-xl">
        <ShieldX />
        <span className="border-l-2 border-slate-500 pl-2 ml-2">No CV</span>
      </div>
    );
  }
  if (status == "PASSED") {
    return (
      <div className="flex items-center bg-lime-300 text-slate-500 p-2 rounded-xl">
        <ShieldCheck />
        <span className="border-l-2 border-slate-500 pl-2 ml-2">Verified</span>
      </div>
    );
  }
  if (status == "REFUSED") {
    return (
      <div className="flex items-center bg-red-300 text-slate-500 p-2 rounded-xl">
        <ShieldX />
        <span className="border-l-2 border-slate-500 pl-2 ml-2">Refused</span>
      </div>
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="group flex items-center bg-slate-300 text-slate-500 p-2 rounded-xl hover:bg-slate-500 hover:text-white">
          <ShieldHalf />
          <span className="border-l-2 border-slate-500 pl-2 ml-2 group-hover:border-white">
            {isUpdating ? "Updating" : "Verify"}
          </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to verify this tutor?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Link
              target="_blank"
              href={`http://localhost:3001/tutors/cvs/download/${tutor_id}`}
              download
            >
              <button className="p-2 bg-slate-200 rounded-xl hover:bg-slate-300">
                Download CV
              </button>
            </Link>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={async () => {
              setIsUpdating(true);
              await updateTutorCV(tutor_id, "REFUSED");
              setIsUpdating(false);
            }}
          >
            Refuse
          </AlertDialogAction>
          <AlertDialogAction
            className="bg-lime-500 hover:bg-lime-600"
            onClick={async () => {
              setIsUpdating(true);
              await updateTutorCV(tutor_id, "PASSED");
              setIsUpdating(false);
            }}
          >
            Verify
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
