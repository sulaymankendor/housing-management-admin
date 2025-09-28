import StatCard from "@/components/reuseables/StatCard";
import StaffsTable from "@/components/staffs/StaffsTable";
import { Backpack } from "lucide-react";
const staffs = [
  { id: 1, title: "Total Staffs", stat: "100" },
  { id: 2, title: "Active Staffs", stat: "40" },
  { id: 3, title: "Total Staffs", stat: "40" },
  { id: 4, title: "Active Staffs", stat: "40" },
];

export default function Staffs() {
  return (
    <section>
      <div className="grid grid-cols-4 gap-5">
        {staffs.map((staff, index) => {
          return (
            <StatCard
              key={staff.id}
              icon={<Backpack className="text-gray-600" />}
              title={staff.title}
              stat={staff.stat}
            />
          );
        })}
      </div>
      <StaffsTable />
    </section>
  );
}
