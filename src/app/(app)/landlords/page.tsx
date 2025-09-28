import StatCard from "@/components/reuseables/StatCard";
import LandlordsTable from "@/components/landlord/LandlordsTable";
import { Backpack } from "lucide-react";
// import { BanknotesIcon } from "@heroicons/react/16/solid";

export default function Landlord() {
  return (
    <section>
      <div className="grid grid-cols-4 gap-5">
        {[...Array(4)].map((_, index) => {
          return (
            <StatCard
              key={index}
              icon={<Backpack className="text-gray-600" />}
              title={"Total Balance"}
              stat="D2,000"
            />
          );
        })}
      </div>
      <LandlordsTable />
    </section>
  );
}
