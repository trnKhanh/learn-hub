import { UserInfoTable } from "../../_components/user-info-table";

export const SupporterInfoTable = ({ supporter }: { supporter: Supporter }) => {
  return (
    <div className="flex flex-col">
      <UserInfoTable user={supporter} />
      <div className="text-center mt-3 text-xl">Supporter Information</div>
      <table className="border border-collapse ">
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">Role</th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {supporter.role}
          </th>
        </tr>
      </table>
    </div>
  );
};
