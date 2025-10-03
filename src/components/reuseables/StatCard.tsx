import React, { ReactNode } from "react";

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
    <div className="border bg-white border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <div className="bg-cyan-100 p-2 rounded-full">{icon}</div>
        <h1 className="text-xs text-gray-600">{title}</h1>
      </div>
      <p className="font-semibold text-[19px] mt-2 text-black ml-11">{stat}</p>
    </div>
  );
}

export default StatCard;
