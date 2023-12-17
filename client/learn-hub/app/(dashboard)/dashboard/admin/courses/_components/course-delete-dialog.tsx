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
import { Trash2 } from "lucide-react";
import { DashboardSectionButton } from "../../../_components/dashboard-section";
import { Dispatch, SetStateAction } from "react";

interface CourseDeleteDialogProps {
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  onDelete: { (e: React.MouseEvent<HTMLElement>): void };
}
export const CourseDeleteDialog = ({
  isDeleting,
  setIsDeleting,
  onDelete,
}: CourseDeleteDialogProps) => {
  if (isDeleting)
    return (
      <DashboardSectionButton icon={Trash2} label="Deleting..." hover={false} />
    );

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <DashboardSectionButton icon={Trash2} label="Delete" hover={true} />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete all related information.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-slate-500 hover:bg-slate-600"
            onClick={async (e) => {
              setIsDeleting(true);
              await onDelete(e);
              setIsDeleting(false);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
