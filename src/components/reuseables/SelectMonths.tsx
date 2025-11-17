"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

export function SelectMonths({
  placeholder,
  items,
}: {
  placeholder: string;
  items: string[];
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleRemove = (value: string) => {
    setSelectedValues((prev) => prev.filter((item) => item !== value));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <div className="flex min-h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm cursor-pointer hover:border-gray-400 transition-colors">
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedValues.length > 0 ? (
                selectedValues.map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="text-xs px-2 py-0.5 gap-1"
                  >
                    {value}
                    <X
                      className="size-3 cursor-pointer hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(value);
                      }}
                    />
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </div>
            <ChevronDown className="size-4 text-gray-600 shrink-0 ml-2" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandGroup className="max-h-64 overflow-auto">
            {items.map((item) => (
              <CommandItem
                key={item}
                onSelect={() => handleSelect(item)}
                className="text-xs flex items-center justify-between"
              >
                {item}
                <Check
                  className={`mr-2 size-2 ${
                    selectedValues.includes(item) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
