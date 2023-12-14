import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export const InfoButton = ({
  label,
  infoTable,
}: {
  label: string;
  infoTable: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="group flex items-center bg-slate-300 text-slate-500 p-2 rounded-xl hover:bg-slate-500 hover:text-white">
          <Info/>
          <span className="border-l-2 border-slate-500 pl-2 ml-2 group-hover:border-white">
            Info
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogHeader className="font-bold text-2xl">{label} Infomation</DialogHeader>
        </DialogHeader>
        {infoTable}
      </DialogContent>
    </Dialog>
  );
};
