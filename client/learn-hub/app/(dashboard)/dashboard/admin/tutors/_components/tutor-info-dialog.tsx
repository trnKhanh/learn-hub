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

export const TutorInfoDialog = ({ tutor }: { tutor: Tutor }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DashboardSectionButton icon={Info} label="Info" hover={true} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Tutor Information
          </DialogTitle>
        </DialogHeader>

        <UserInfoTable user={tutor} />
        <InfoTable label="Tutor Information">
          <InfoTableRow>
            <InfoTableKey>Profit</InfoTableKey>
            <InfoTableValue>{tutor.profit || "0"}</InfoTableValue>
          </InfoTableRow>
        </InfoTable>
      </DialogContent>
    </Dialog>
  );
};
