import { useEffect, useState } from "react";
import { SubjectsFilter } from "./subjects-filter";
import { LanguagesFilter } from "./languages-filter";
import { DifficultiesFilter } from "./difficulties-filter";
import { PriceFilter } from "./price-filter";
import { DurationFilter } from "./duration-filter";

export const FilterBar = () => {
  return (
    <div className="flex flex-col h-full w-72 space-y-6">
      <SubjectsFilter />
      <DifficultiesFilter />
      <LanguagesFilter />
      <PriceFilter />
    </div>
  );
};
