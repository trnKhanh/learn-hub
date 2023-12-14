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
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DashboardSectionButton } from "../../../_components/dashboard-section";
import { toast } from "react-toastify";

interface TutorVerifyButtonProps {
  tutor: Tutor;
}
export const TutorVerifyDialog = ({ tutor }: TutorVerifyButtonProps) => {
  const [status, setStatus] = useState("NO_CV");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getTutorCV(tutor.id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setStatus(res.data.tutorCV.status);
        } 
      }
    });
  }, []);

  if (status == "NO_CV") {
    return (
      <DashboardSectionButton
        className="bg-slate-300"
        icon={ShieldX}
        label="No CV"
        hover={false}
      />
    );
  }
  if (status == "PASSED") {
    return (
      <DashboardSectionButton
        className="bg-lime-300"
        icon={ShieldCheck}
        label="Verified"
        hover={false}
      />
    );
  }
  if (status == "REFUSED") {
    return (
      <DashboardSectionButton
        className="bg-red-300"
        icon={ShieldX}
        label="Refused"
        hover={false}
      />
    );
  }
  if (isUpdating) {
    return (
      <DashboardSectionButton
        icon={ShieldHalf}
        label={"Updating"}
        hover={false}
      />
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <DashboardSectionButton
          icon={ShieldHalf}
          label={"Verify"}
          hover={true}
        />
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
              const res = await updateTutorCV(tutor.id, "REFUSED");
              if (res) {
                if (res.status == 200) {
                  setStatus(res.data.tutorCVs[0].status);
                } else {
                  toast.error(res.data.message);
                }
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
              const res = await updateTutorCV(tutor.id, "REFUSED");
              if (res) {
                if (res.status == 200) {
                  setStatus(res.data.tutorCVs[0].status);
                } else {
                  toast.error(res.data.message);
                }
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
