import { Slider, Input } from "@mui/material";
import { useContext } from "react";
import { SearchContext } from "../search-provider";
export const PriceFilter = () => {
  const { price, setPrice } = useContext(SearchContext);
  return (
    <div className="flex flex-col p-2 space-y-2 border-2 rounded-sm border-slate-300">
      <p className="font-bold">Price Filter</p>
      <div className="flex space-x-2">
        <Input
          className="mr-auto"
          value={price[0]}
          size="small"
          onChange={(e) => {
            const value = e.target.value === "" ? 0 : Number(e.target.value);
            setPrice((price) => [value, price[1]]);
          }}
          inputProps={{
            step: 0.1,
            min: 0,
            max: 1000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
        <Input
          className=""
          value={price[1]}
          size="small"
          onChange={(e) => {
            const value = e.target.value === "" ? 0 : Number(e.target.value);
            setPrice((price) => [price[0], value]);
          }}
          inputProps={{
            step: 0.1,
            min: 0,
            max: 1000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={price}
        onChange={(e, value) => {
          setPrice(value as number[]);
        }}
        min={0}
        max={1000}
      />
    </div>
  );
};
