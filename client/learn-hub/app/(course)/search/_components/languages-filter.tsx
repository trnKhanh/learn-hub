import { getAllLanguages } from "@/actions/languages";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../search-provider";
import { Checkbox } from "@mui/material";

export const LanguagesFilter = () => {
  const { languages, setLanguages, setIsSearching } = useContext(SearchContext);
  const [languageList, setLanguageList] = useState<Language[]>([]);
  useEffect(() => {
    setLanguageList([
      {
        id: "1",
        name: "English",
      },
      {
        id: "2",
        name: "Vietnamese",
      },
    ]);
    getAllLanguages().then((res) => {
      if (res && res.status == 200) {
        setLanguageList(res.data.languages);
      }
    });
  }, []);
  const deselectLanguage = (selected_id: string) => {
    setLanguages((ids) => ids.filter((id) => id != selected_id));
  };

  const selectLanguage = (selected_id: string) => {
    setLanguages((ids) => [...ids, selected_id]);
  };

  return (
    <div className="flex flex-col p-2 border-2 rounded-sm border-slate-300">
      <p className="font-bold mb-2">Languages Filter</p>
      {languageList.length &&
        languageList.map((language) => (
          <div key={language.id} className="flex items-center ">
            <Checkbox
              id={language.id}
              onChange={(e) => {
                if (e.target.checked) {
                  selectLanguage(language.id);
                } else {
                  deselectLanguage(language.id);
                }
                setIsSearching(true);
              }}
            />
            <label htmlFor={language.id}>{language.name}</label>
          </div>
        ))}
    </div>
  );
};
