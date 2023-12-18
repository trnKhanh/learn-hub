"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { CourseContainer } from "./_components/course-container";
import { FilterBar } from "./_components/filter-bar";
import { SearchBar } from "./_components/search-bar";
import { SearchProvider } from "./search-provider";

const SearchPage = () => {
  return (
    <SearchProvider>
      <div className="pt-[6.4rem] p-6 flex flex-col space-y-6">
        <SearchBar />
        <div className="flex">
          <FilterBar />
          <CourseContainer />
        </div>
      </div>
    </SearchProvider>
  );
};

export default SearchPage;
