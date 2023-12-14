import { UserInfoTable } from "../../_components/user-info-table";

export const CourseInfoTable = ({ course }: { course: Course }) => {
  return (
    <div className="flex flex-col">
      <div className="text-center mt-3 text-xl">Course Information</div>
      <table className="border border-collapse ">
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">Name</th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {course.name || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Duration
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {course.duration ? `${course.duration} days` : "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Difficulty
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {course.difficulty || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">Price</th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {course.price || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Discount
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {course.discount || "None"}
          </th>
        </tr>
      </table>
    </div>
  );
};
