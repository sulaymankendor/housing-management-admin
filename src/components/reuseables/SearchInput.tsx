import { Search } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

function SearchInput({
  placeholder,
  searchText,
  setSearchText,
  setFilter,
  filter,
}: {
  placeholder: string;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  filter?: string;
  setFilter?: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center gap-2 border rounded-lg px-2 bg-white">
      <Search className="text-gray-600 size-4.5" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(event) => {
          if (filter !== "All Expenses" && filter) {
            setFilter("All Expenses");
          }
          setSearchText(event.target.value);
        }}
        value={searchText}
        className="h-9 border-none outline-none text-[13px] font-medium w-full text-black"
      />
    </div>
  );
}

export default SearchInput;
