import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { DashboardSectionButton } from "../../../_components/dashboard-section";
import {
  InfoTable,
  InfoTableKey,
  InfoTableRow,
  InfoTableValue,
} from "../../../_components/info-table";
import { UserInfoTable } from "../../../_components/user-info-table";

export const StudentInfoDialog = ({ student }: { student: Student }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DashboardSectionButton icon={Info} label="Info" hover={true} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Student Information
          </DialogTitle>
        </DialogHeader>

        <UserInfoTable user={student} />
        <InfoTable label="Student Information">
          <InfoTableRow>
            <InfoTableKey>Membership</InfoTableKey>
            <InfoTableValue>{student.membership || "None"}</InfoTableValue>
          </InfoTableRow>
        </InfoTable>
      </DialogContent>
    </Dialog>
  );
};
