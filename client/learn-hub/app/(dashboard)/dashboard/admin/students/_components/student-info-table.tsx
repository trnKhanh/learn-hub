import { UserInfoTable } from "../../_components/user-info-table";

export const StudentInfoTable = ({ student }: { student: Student }) => {
  return (
    <div className="flex flex-col">
      <UserInfoTable user={student} />
      <div className="text-center mt-3 text-xl">Student Information</div>
      <table className="border border-collapse ">
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Membership
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {student.membership || "None"}
          </th>
        </tr>
      </table>
    </div>
  );
};
