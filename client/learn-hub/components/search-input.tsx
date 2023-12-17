import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div
      className={cn("relative", pathName.startsWith("/search") && "invisible")}
    >
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?courseName=${value}`);
        }}
      >
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-full md:w-[400px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
          placeholder="Search for a course"
        />
      </form>
    </div>
  );
};

export default SearchInput;
