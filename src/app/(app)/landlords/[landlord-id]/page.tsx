import TenantsTable from "@/components/landlord/TenantsTable";
import StatCard from "@/components/reuseables/StatCard";
import { Backpack } from "lucide-react";
import React from "react";

function page() {
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
      <TenantsTable />
    </section>
  );
}

export default page;
