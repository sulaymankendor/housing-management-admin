import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormRegister } from "react-hook-form";

export function CustomSelectInput({
  width,
  onChange,
  value,
  placeholder,
  items,
}: {
  width?: string;
  onChange: (...event: any[]) => void;
  value: string;
  placeholder?: string;
  items: string[];
}) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className={`text-xs shadow-none ${width ? width : "w-full"}`}
      >
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
