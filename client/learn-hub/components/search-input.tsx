import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchInput = () => {
    const [value, setValue] = useState("");
    
    return (
        <div className="relative">
            <Search
            className="h-4 w-4 absolute top-3 left-3 text-slate-600"
            />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full md:w-[400px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Search for a course"
            />
        </div>
    )
}

export default SearchInput;