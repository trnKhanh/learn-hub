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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TutorVerifyButtonProps {
  tutor: Tutor;
}
export const TutorVerifyButton = ({ tutor }: TutorVerifyButtonProps) => {
  const [status, setStatus] = useState("NO_CV");
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    getTutorCV(tutor.id).then((data) => {
      console.log(data);
      if (data) {
        if (data.tutorCV) {
          setStatus(data.tutorCV.status);
        }
      }
    });
  });

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
            Please inspect the submitted CV before verification.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Link
          target="_blank"
          href={`http://localhost:3001/tutors/cvs/download/${tutor.id}`}
          download
        >
          <button className="p-2 bg-slate-200 rounded-xl hover:bg-slate-300">
            Download CV
          </button>
        </Link>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={async () => {
              setIsUpdating(true);
              const data = await updateTutorCV(tutor.id, "REFUSED");
              if (data) {
                setStatus(data.tutorCVs[0].status);
              }
              setIsUpdating(false);
            }}
          >
            Refuse
          </AlertDialogAction>
          <AlertDialogAction
            className="bg-lime-500 hover:bg-lime-600"
            onClick={async () => {
              setIsUpdating(true);
              const data = await updateTutorCV(tutor.id, "PASSED");
              if (data) {
                setStatus(data.tutorCVs[0].status);
              }
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
