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
import { InfoTable, InfoTableKey, InfoTableRow, InfoTableValue } from "../../../_components/info-table";
import { CourseInfoTable } from "./course-info-table";

export const CourseInfoDialog = ({ course }: { course: Course }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DashboardSectionButton icon={Info} label="Info" hover={true} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Course Information
          </DialogTitle>
        </DialogHeader>

        <CourseInfoTable course={course}/>
      </DialogContent>
    </Dialog>
  );
};
