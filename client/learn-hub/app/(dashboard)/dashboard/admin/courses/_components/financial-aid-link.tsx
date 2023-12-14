import { ArrowUpRightSquare, ShieldX } from "lucide-react";
import Link from "next/link";
export const FinancialAidLink = ({ course_id }: { course_id: string }) => {
  return (
    <Link
      href={`/dashboard/admin/courses/${course_id}/financial-aids`}
      className="group flex items-center bg-slate-300 text-slate-500 p-2 rounded-xl hover:bg-slate-500 hover:text-white"
    >
      <ArrowUpRightSquare />
      <span className="border-l-2 border-slate-500 pl-2 ml-2 group-hover:border-white">
        Finalcial Aids
      </span>
    </Link>
  );
};
