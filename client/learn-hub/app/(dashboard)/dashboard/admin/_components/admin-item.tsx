"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteButton } from "./delete-button";
import { ShieldHalf } from "lucide-react";
import { VerifyButton } from "./verify-button";

interface AdminItemProps {
  picture: string;
  label: string;
  // onVerify?: { (e: React.MouseEvent<HTMLElement>): void };
  verifyButton?: React.ReactNode;
  onDelete: { (e: React.MouseEvent<HTMLElement>): void };
}

export const AdminItem = ({
  picture,
  label,
  verifyButton,
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
        {verifyButton}
        <DeleteButton onDelete={onDelete} />
      </div>
    </div>
  );
};
