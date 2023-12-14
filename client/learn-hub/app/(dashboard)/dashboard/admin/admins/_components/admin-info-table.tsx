import { UserInfoTable } from "../../_components/user-info-table";

export const AdminInfoTable = ({ admin }: { admin: Admin }) => {
  return (
    <div className="flex flex-col">
      <UserInfoTable user={admin} />
      <div className="text-center mt-3 text-xl">Admin Information</div>
      <table className="border border-collapse ">
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Course access
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {admin.courses_access ? "Yes" : "No"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Student access
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {admin.students_access ? "Yes" : "No"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Tutor access
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {admin.tutors_access ? "Yes" : "No"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Supporter access
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {admin.supporters_access ? "Yes" : "No"}
          </th>
        </tr>
      </table>
    </div>
  );
};
