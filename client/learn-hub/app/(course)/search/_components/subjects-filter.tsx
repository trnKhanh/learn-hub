import { getAllSubjects } from "@/actions/subjects";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../search-provider";
import { Checkbox } from "@mui/material";

export const SubjectsFilter = () => {
  const { subjects, setSubjects, setIsSearching } = useContext(SearchContext);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  useEffect(() => {
    setSubjectList([
      {
        id: "1",
        name: "Math",
      },
      {
        id: "2",
        name: "Physics",
      },
      {
        id: "3",
        name: "Computer Science",
      },
    ]);
    getAllSubjects().then((res) => {
      if (res && res.status == 200) {
        setSubjectList(res.data.subjects);
      }
    });
  }, []);
  const deselectSubject = (selected_id: string) => {
    setSubjects((ids) => ids.filter((id) => id != selected_id));
  };

  const selectSubject = (selected_id: string) => {
    setSubjects((ids) => [...ids, selected_id]);
  };

  return (
    <div className="flex flex-col p-2 space-y-2 border-2 rounded-sm border-slate-300">
      <p className="font-bold">Subjects Filter</p>
      {subjectList.length &&
        subjectList.map((subject) => (
          <div key={subject.id} className="flex items-center space-x-2">
            <Checkbox
              id={subject.id}
              onChange={(e) => {
                if (e.target.checked) {
                  selectSubject(subject.id);
                } else {
                  deselectSubject(subject.id);
                }
                setIsSearching(true);
              }}
            />
            <label htmlFor={subject.id}>{subject.name}</label>
          </div>
        ))}
    </div>
  );
};
