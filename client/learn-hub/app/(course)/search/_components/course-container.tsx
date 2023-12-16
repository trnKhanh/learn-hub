import { Grid } from "@mui/material";
import { useContext } from "react";
import { SearchContext } from "../search-provider";
import { CourseThumbnail } from "./course-thumbnail";

export const CourseContainer = () => {
  const { results } = useContext(SearchContext);
  return (
    <div className="w-full">
      <Grid container spacing={3} alignItems="center">
        {results.map((course) => (
          <Grid item key={course.id} xs={4}>
            <CourseThumbnail course={course} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
