import { Input } from "@/components/ui/input";
import { SearchContext } from "../search-provider";
import { useContext } from "react";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const { courseName, setCourseName, setIsSearching } = useContext(SearchContext);
  return (
    <div className="ml-72 relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSearching(true);
        }}
      >
        <Input
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          type="search"
          name="search"
          value={courseName}
          placeholder="Search for a course"
          className="pl-9 max-w-3xl rounded-full border-slate-600"
        />
      </form>
    </div>
  );
};
