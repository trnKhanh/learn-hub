import {
  InfoTable,
  InfoTableKey,
  InfoTableRow,
  InfoTableValue,
} from "./info-table";

export const UserInfoTable = ({ user }: { user: User }) => {
  return (
    <InfoTable label="User Information">
      <InfoTableRow>
        <InfoTableKey>Full name</InfoTableKey>
        <InfoTableValue> {user.full_name || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Email</InfoTableKey>
        <InfoTableValue> {user.email || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Username</InfoTableKey>
        <InfoTableValue> {user.username || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Phone number</InfoTableKey>
        <InfoTableValue> {user.phone_number || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Institute</InfoTableKey>
        <InfoTableValue> {user.institute || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Area of study</InfoTableKey>
        <InfoTableValue> {user.area_of_study || "None"}</InfoTableValue>
      </InfoTableRow>
    </InfoTable>
  );
};
