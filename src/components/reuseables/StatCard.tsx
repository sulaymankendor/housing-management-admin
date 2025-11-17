import React, { ReactNode } from "react";
import { DatePicker } from "./DatePicker";
import { SelectMonths } from "./SelectMonths";
import { listOfMonths } from "@/lib/data";
import { formatPrice } from "@/lib/formatPrice";

function StatCard({
  icon,
  title,
  stat,
}: {
  icon: ReactNode;
  title: string;
  stat: string;
}) {
  return (
    <div className="border bg-white border-gray-200 rounded-lg px-3 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-cyan-100 p-2 rounded-full">{icon}</div>
          <h1 className="text-xs text-gray-800">{title}</h1>
        </div>
        <SelectMonths placeholder="select" items={listOfMonths} />
      </div>
      <p className="font-semibold text-[18px] mt-2 text-black ml-11">
        {formatPrice(Number(stat))}
      </p>
    </div>
  );
}

export default StatCard;
