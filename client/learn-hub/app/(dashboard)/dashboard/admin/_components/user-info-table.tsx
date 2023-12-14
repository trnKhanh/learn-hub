export const UserInfoTable = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col">
      <div className="text-center text-xl">User Information</div>
      <table>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Full name
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {user.full_name || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">Email</th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {user.email || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Username
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {user.username || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Phone number
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {user.phone_number || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Institute
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {user.institute || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Area of study
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {user.area_of_study || "None"}
          </th>
        </tr>
      </table>
    </div>
  );
};
