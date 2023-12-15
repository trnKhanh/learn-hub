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
import { DashboardSectionButton } from "@/app/(dashboard)/dashboard/_components/dashboard-section";
import { toast } from "react-toastify";

interface FinancialAidVerifyButtonProps {
  financialAid: FinancialAid;
}
export const FinancialAidVerifyDialog = ({
  financialAid,
}: FinancialAidVerifyButtonProps) => {
  const [status, setStatus] = useState(financialAid.status);
  const [isUpdating, setIsUpdating] = useState(false);

  if (status == "ADMIN_PASSED") {
    return (
      <DashboardSectionButton
        className="bg-lime-300"
        icon={ShieldCheck}
        label="Admin Passed"
        hover={false}
      />
    );
  }
  if (status == "TUTOR_PASSED") {
    return (
      <DashboardSectionButton
        className="bg-lime-300"
        icon={ShieldCheck}
        label="Tutor Passed"
        hover={false}
      />
    );
  }
  if (status == "ADMIN_DENIED") {
    return (
      <DashboardSectionButton
        className="bg-red-300"
        icon={ShieldX}
        label="Admin Denied"
        hover={false}
      />
    );
  }
  if (status == "TUTOR_DENIED") {
    return (
      <DashboardSectionButton
        className="bg-red-300"
        icon={ShieldX}
        label="Tutor Denied"
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
            Are you sure to pass this financial aid?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <FinancialAidInfoTable financialAid={financialAid} />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={async () => {
              setIsUpdating(true);
              const res = await updateFinancialAid(
                financialAid.course_id,
                financialAid.student_id,
                "DENIED",
              );
              if (res) {
                if (res.status == 200) {
                  setStatus(res.data.financialAids[0].status);
                } else {
                  toast.error(res.data.message);
                }
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
              const res = await updateFinancialAid(
                financialAid.course_id,
                financialAid.student_id,
                "PASSED",
              );
              if (res) {
                if (res.status == 200) {
                  setStatus(res.data.financialAids[0].status);
                } else {
                  toast.error(res.data.message);
                }
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
