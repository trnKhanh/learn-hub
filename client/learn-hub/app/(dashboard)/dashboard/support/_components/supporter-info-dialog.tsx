import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { DashboardSectionButton } from "../../_components/dashboard-section";
import {
  InfoTable,
  InfoTableKey,
  InfoTableRow,
  InfoTableValue,
} from "../../_components/info-table";
import { UserInfoTable } from "../../_components/user-info-table";

export const SupporterInfoDialog = ({
  supporter,
}: {
  supporter: Supporter;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DashboardSectionButton icon={Info} label="Info" hover={true} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Supporter Information
          </DialogTitle>
        </DialogHeader>

        <UserInfoTable user={supporter} />
        <InfoTable label="Supporter Information">
          <InfoTableRow>
            <InfoTableKey>Role</InfoTableKey>
            <InfoTableValue>{supporter.role || "None"}</InfoTableValue>
          </InfoTableRow>
        </InfoTable>
      </DialogContent>
    </Dialog>
  );
};
