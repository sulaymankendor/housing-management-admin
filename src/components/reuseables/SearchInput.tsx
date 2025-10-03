import { Search } from "lucide-react";
import React from "react";

function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2 border rounded-lg px-2 bg-white">
      <Search className="text-gray-600 size-4.5" />
      <input
        type="text"
        placeholder={placeholder}
        className="h-9 border-none outline-none text-[13px] font-medium w-full text-black"
      />
    </div>
  );
}

export default SearchInput;
