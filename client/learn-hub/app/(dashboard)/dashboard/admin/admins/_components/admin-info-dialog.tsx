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

export const AdminInfoDialog = ({ admin }: { admin: Admin }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DashboardSectionButton icon={Info} label="Info" hover={true} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Admin Information
          </DialogTitle>
        </DialogHeader>

        <UserInfoTable user={admin} />
        <InfoTable label="Admin Information">
          <InfoTableRow>
            <InfoTableKey>Courses access</InfoTableKey>
            <InfoTableValue>
              {admin.courses_access ? "Yes" : "No"}
            </InfoTableValue>
          </InfoTableRow>
          <InfoTableRow>
            <InfoTableKey>Tutors access</InfoTableKey>
            <InfoTableValue>
              {admin.tutors_access ? "Yes" : "No"}
            </InfoTableValue>
          </InfoTableRow>
          <InfoTableRow>
            <InfoTableKey>Students access</InfoTableKey>
            <InfoTableValue>
              {admin.students_access ? "Yes" : "No"}
            </InfoTableValue>
          </InfoTableRow>
          <InfoTableRow>
            <InfoTableKey>Supporters access</InfoTableKey>
            <InfoTableValue>
              {admin.supporters_access ? "Yes" : "No"}
            </InfoTableValue>
          </InfoTableRow>
        </InfoTable>
      </DialogContent>
    </Dialog>
  );
};
