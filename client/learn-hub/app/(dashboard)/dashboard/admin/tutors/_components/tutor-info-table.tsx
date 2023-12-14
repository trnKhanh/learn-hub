import { UserInfoTable } from "../../_components/user-info-table";

export const TutorInfoTable = ({ tutor }: { tutor: Tutor }) => {
  return (
    <div className="flex flex-col">
      <UserInfoTable user={tutor} />
    </div>
  );
};
