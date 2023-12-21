import { Input } from "@/components/ui/input";
import { SearchContext } from "../search-provider";
import { useContext, useState } from "react";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const { courseName, setCourseName } = useContext(SearchContext);
  const [query, setQuery] = useState(courseName || "");
  return (
    <div className="ml-72 relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCourseName(query);
        }}
      >
        <Input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          type="search"
          name="search"
          value={query}
          placeholder="Search for a course"
          className="pl-9 max-w-3xl rounded-full border-slate-600"
        />
      </form>
    </div>
  );
};
