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
import { ShieldHalf } from "lucide-react";

interface VerifyButtonProps {
  onVerify: { (e: React.MouseEvent<HTMLElement>): void };
}
export const VerifyButton = ({ onVerify }: VerifyButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="group flex items-center bg-slate-300 text-slate-500 p-2 rounded-xl hover:bg-slate-500 hover:text-white">
          <ShieldHalf />
          <span className="border-l-2 border-slate-500 pl-2 ml-2 group-hover:border-white">
            Verify
          </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to verify?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-slate-500 hover:bg-slate-600"
            onClick={onVerify}
          >
            Verify
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
