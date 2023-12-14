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
import { FinancialAidInfoTable } from "./financial-aid-info-table";
import { updateFinancialAid } from "@/actions/courses";

interface FinancialAidVerifyButtonProps {
  financialAid: FinancialAid;
}
export const FinancialAidVerifyButton = ({
  financialAid,
}: FinancialAidVerifyButtonProps) => {
  const [status, setStatus] = useState(financialAid.status);
  const [isUpdating, setIsUpdating] = useState(false);

  if (status == "ADMIN_PASSED") {
    return (
      <div className="flex items-center bg-lime-300 text-slate-500 p-2 rounded-xl">
        <ShieldCheck />
        <span className="border-l-2 border-slate-500 pl-2 ml-2">
          Admin Passed
        </span>
      </div>
    );
  }
  if (status == "TUTOR_PASSED") {
    return (
      <div className="flex items-center bg-lime-300 text-slate-500 p-2 rounded-xl">
        <ShieldCheck />
        <span className="border-l-2 border-slate-500 pl-2 ml-2">
          TUTOR_PASSED
        </span>
      </div>
    );
  }
  if (status == "ADMIN_DENIED") {
    return (
      <div className="flex items-center bg-red-300 text-slate-500 p-2 rounded-xl">
        <ShieldX />
        <span className="border-l-2 border-slate-500 pl-2 ml-2">
          Admin Denied
        </span>
      </div>
    );
  }
  if (status == "TUTOR_DENIED") {
    return (
      <div className="flex items-center bg-red-300 text-slate-500 p-2 rounded-xl">
        <ShieldX />
        <span className="border-l-2 border-slate-500 pl-2 ml-2">
          Tutor Denied
        </span>
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
            Are you sure to pass this financial aid?
          </AlertDialogTitle>
          <FinancialAidInfoTable financialAid={financialAid} />
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={async () => {
              setIsUpdating(true);
              const data = await updateFinancialAid(
                financialAid.course_id,
                financialAid.student_id,
                "DENIED",
              );
              if (data) {
                setStatus(data.financialAids[0].status);
              }
              setIsUpdating(false);
            }}
          >
            Deny
          </AlertDialogAction>
          <AlertDialogAction
            className="bg-lime-500 hover:bg-lime-600"
            onClick={async () => {
              setIsUpdating(true);
              const data = await updateFinancialAid(
                financialAid.course_id,
                financialAid.student_id,
                "PASSED",
              );
              if (data) {
                setStatus(data.financialAids[0].status);
              }
              setIsUpdating(false);
            }}
          >
            Pass
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
