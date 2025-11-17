"use client";
import ExpendituresTable from "@/components/expenditures/ExpendituresTable";
import StatCard from "@/components/reuseables/StatCard";
import ChargeExtraMoneyIcon from "@/components/svgs/ChargeExtraMoneyIcon";
import CorpInterestExpensesIcon from "@/components/svgs/CorpInterestExpensesIcon";
import SalesAmountIcon from "@/components/svgs/SalesAmountIcon";
import ScopeExpenseClaimsIcon from "@/components/svgs/ScopeExpenseClaimsIcon";
import { formatPrice } from "@/lib/formatPrice";
import React, { useState } from "react";

function Expenditures() {
  const [landlordStats, setLandlordStats] = useState([
    {
      id: 1,
      title: "Total Revenue",
      stat: "D0",
      icon: SalesAmountIcon,
    },
    {
      id: 2,
      title: "Expenses",
      stat: `D${formatPrice(0)}`,
      icon: ScopeExpenseClaimsIcon,
    },
    {
      id: 3,
      title: "Charged",
      stat: `D${formatPrice(0)}`,
      icon: ChargeExtraMoneyIcon,
    },
    {
      id: 4,
      title: "Uncharged",
      stat: `D${formatPrice(0)}`,
      icon: CorpInterestExpensesIcon,
    },
  ]);
  return (
    <section>
      <div className="grid grid-cols-4 gap-5">
        {landlordStats.map((stat, index) => {
          return (
            <StatCard
              key={stat.id}
              icon={<stat.icon />}
              title={stat.title}
              stat={stat.stat}
            />
          );
        })}
      </div>
      <ExpendituresTable />
    </section>
  );
}

export default Expenditures;
