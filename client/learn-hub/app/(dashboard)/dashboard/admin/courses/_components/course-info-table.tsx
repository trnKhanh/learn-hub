import {
  InfoTable,
  InfoTableKey,
  InfoTableRow,
  InfoTableValue,
} from "../../../_components/info-table";

export const CourseInfoTable = ({ course }: { course: Course }) => {
  return (
    <InfoTable label="Course Information">
      <InfoTableRow>
        <InfoTableKey>name</InfoTableKey>
        <InfoTableValue> {course.name || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Duration</InfoTableKey>
        <InfoTableValue>
          {course.duration ? `${course.duration} days` : "None"}
        </InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Difficulty</InfoTableKey>
        <InfoTableValue> {course.difficulty || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Price</InfoTableKey>
        <InfoTableValue> {course.price || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Discount</InfoTableKey>
        <InfoTableValue> {course.discount || "None"}</InfoTableValue>
      </InfoTableRow>
    </InfoTable>
  );
};
