"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteButton } from "./delete-button";
import { ShieldHalf } from "lucide-react";

interface AdminItemProps {
  picture: string;
  label: string;
  buttons: React.ReactNode;
  onDelete?: { (e: React.MouseEvent<HTMLElement>): void };
}

export const AdminItem = ({
  picture,
  label,
  buttons,
  onDelete,
}: AdminItemProps) => {
  return (
    <div className="flex items-center text-slate-500 font-[500] bg-slate-100 hover:bg-slate-200 hover:text-slate-600 rounded-2xl p-2">
      <Avatar className="bg-slate-500">
        <AvatarImage src={picture} />
        <AvatarFallback>{label.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="ml-6">{label}</div>
      <div className="flex space-x-2 ml-auto">
        {buttons}
        {onDelete && <DeleteButton onDelete={onDelete} />}
      </div>
    </div>
  );
};
