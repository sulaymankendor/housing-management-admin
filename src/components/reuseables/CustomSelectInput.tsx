import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomSelectInput({
  placeholder,
  items,
}: {
  placeholder: string;
  items: string[];
}) {
  return (
    <Select>
      <SelectTrigger className="text-xs shadow-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item} value={item} className="text-xs">
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
