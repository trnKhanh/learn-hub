import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../search-provider";
import { Checkbox } from "@mui/material";

export const DifficultiesFilter = () => {
  const { difficulties, setDifficulties, setIsSearching } = useContext(SearchContext);
  const difficultyList = [
    {
      id: "BEGINNER",
      name: "Beginner",
    },
    {
      id: "INTERMEDIATE",
      name: "Intermediate",
    },
    {
      id: "ADVANCED",
      name: "Advanced",
    },
  ];

  const deselectDifficulty = (selected_id: string) => {
    setDifficulties((ids) => ids.filter((id) => id != selected_id));
  };

  const selectDifficulty = (selected_id: string) => {
    setDifficulties((ids) => [...ids, selected_id]);
  };

  return (
    <div className="flex flex-col p-2 space-y-2 border-2 rounded-sm border-slate-300">
      <p className="font-bold">Difficulties Filter</p>
      {difficultyList.length &&
        difficultyList.map((difficulty) => (
          <div key={difficulty.id} className="flex items-center space-x-2">
            <Checkbox
              id={difficulty.id}
              onChange={(e) => {
                if (e.target.checked) {
                  selectDifficulty(difficulty.id);
                } else {
                  deselectDifficulty(difficulty.id);
                }
                setIsSearching(true);
              }}
            />
            <label htmlFor={difficulty.id}>{difficulty.name}</label>
          </div>
        ))}
    </div>
  );
};
