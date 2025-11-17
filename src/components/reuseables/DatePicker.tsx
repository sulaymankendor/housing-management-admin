"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

// Convert Date to ISO string
function dateToString(date: Date | undefined): string {
  if (!date || !isValidDate(date)) {
    return "";
  }
  return date.toISOString();
}

export function DatePicker({
  dateValue,
  width,
  placeholder,
  onChange,
}: {
  dateValue?: string;
  width?: string;
  placeholder: string;
  onChange: (date: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (!dateValue) return undefined;
    const d = new Date(dateValue);
    return isValidDate(d) ? d : undefined;
  });
  const [month, setMonth] = React.useState<Date | undefined>(
    () => date || new Date()
  );
  const [value, setValue] = React.useState(() => formatDate(date));
  React.useEffect(() => {
    if (!dateValue) {
      setDate(undefined);
      setValue("");
      setMonth(new Date());
    } else {
      const newDate = new Date(dateValue);
      if (isValidDate(newDate)) {
        setDate(newDate);
        setValue(formatDate(newDate));
        setMonth(newDate);
      }
    }
  }, [dateValue]);
  // Memoize onChange to prevent rerenders
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const handleCalendarSelect = React.useCallback(
    (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      const formatted = formatDate(selectedDate);
      setValue(formatted);
      setOpen(false);
      // Call onChange immediately for calendar selection (no debounce needed)
      onChangeRef.current(dateToString(selectedDate));
    },
    []
  );

  const handleMonthChange = React.useCallback((newMonth: Date | undefined) => {
    setMonth(newMonth);
  }, []);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue);

      const parsedDate = new Date(inputValue);
      if (isValidDate(parsedDate)) {
        setDate(parsedDate);
        setMonth(parsedDate);
        onChangeRef.current(dateToString(parsedDate));
      } else {
        onChangeRef.current("");
      }
    },
    []
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
    },
    []
  );

  return (
    <div className={`flex flex-col gap-3 w-full ${width || "w-42"}`}>
      <div className="relative flex gap-2">
        <Input
          value={value}
          placeholder={placeholder}
          className="bg-background pr-10"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              type="button"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5 text-gray-600" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={handleMonthChange}
              onSelect={handleCalendarSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
