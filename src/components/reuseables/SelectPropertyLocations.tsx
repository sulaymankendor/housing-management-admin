"use client";
import * as React from "react";
import { Check, Plus } from "lucide-react";
import {
  UseFormSetValue,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import { Input } from "../ui/input";

interface SelectPropertyLocationsProps {
  placeholder: string;
  items: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
}

export function SelectPropertyLocations({
  placeholder,
  items: initialItems,
  value = [],
  onChange,
  error,
}: SelectPropertyLocationsProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<string[]>(initialItems);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const handleSelect = (item: string) => {
    const newValues = value.includes(item)
      ? value.filter((v) => v !== item)
      : [...value, item];

    onChange?.(newValues);
  };

  const handleAddItem = () => {
    const trimmedValue = searchValue.trim();
    if (trimmedValue && !items.includes(trimmedValue)) {
      setItems((prev) => [...prev, trimmedValue]);
      handleSelect(trimmedValue);
      setSearchValue("");
    }
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase())
  );

  const showAddButton =
    searchValue.trim() && !items.includes(searchValue.trim());

  const displayValue = value.join(", ");

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            placeholder={placeholder}
            value={displayValue}
            readOnly
            className={"text-left cursor-pointer"}
          />
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search or add location..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>
              <div className="py-6 text-center text-sm">No results found.</div>
            </CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {filteredItems.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => handleSelect(item)}
                  className="text-xs flex items-center justify-between"
                >
                  {item}
                  <Check
                    className={`mr-2 size-4 ${
                      value.includes(item) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
              {showAddButton && (
                <CommandItem
                  onSelect={handleAddItem}
                  className="text-xs flex items-center gap-2 text-blue-600"
                >
                  <Plus className="size-4" />
                  Add "{searchValue.trim()}"
                </CommandItem>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
