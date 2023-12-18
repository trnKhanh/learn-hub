import { searchCourses } from "@/actions/courses";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface SearchContextProps {
  subjects: string[];
  setSubjects: Dispatch<SetStateAction<string[]>>;
  languages: string[];
  setLanguages: Dispatch<SetStateAction<string[]>>;
  difficulties: string[];
  setDifficulties: Dispatch<SetStateAction<string[]>>;
  price: number[];
  setPrice: Dispatch<SetStateAction<number[]>>;
  courseName: string;
  setCourseName: Dispatch<SetStateAction<string>>;
  results: Course[];
  setResults: Dispatch<SetStateAction<Course[]>>;
}

export const SearchContext = createContext<SearchContextProps>({
  subjects: [],
  setSubjects: () => {},
  languages: [],
  setLanguages: () => {},
  difficulties: [],
  setDifficulties: () => {},
  price: [0, 1000],
  setPrice: () => {},
  courseName: "",
  setCourseName: () => {},
  results: [],
  setResults: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const [subjects, setSubjects] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 1000]);
  const [courseName, setCourseName] = useState<string>(
    searchParams.get("courseName") || "",
  );
  const [results, setResults] = useState<Course[]>([]);

  useEffect(() => {
    searchCourses({
      subjects: subjects,
      languages: languages,
      courseName: courseName,
      difficulties: difficulties,
      priceMin: price[0],
      priceMax: price[1],
    }).then((res) => {
      if (res && res.status == 200) {
        setResults(res.data.courses);
      }
    });
  }, [subjects, languages, difficulties, price, courseName]);

  return (
    <SearchContext.Provider
      value={{
        subjects,
        setSubjects,
        languages,
        setLanguages,
        difficulties,
        setDifficulties,
        price,
        setPrice,
        courseName,
        setCourseName,
        results,
        setResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
