import { Search } from "lucide-react";
import React from "react";

function SearchInput() {
  return (
    <div className="flex items-center gap-2 border  rounded-lg px-2 bg-white">
      <Search className="text-gray-500" size={18} />
      <input
        type="text"
        placeholder="Search by name, id... "
        className="h-9 border-none outline-none text-sm w-48 text-gray-800"
      />
    </div>
  );
}

export default SearchInput;
