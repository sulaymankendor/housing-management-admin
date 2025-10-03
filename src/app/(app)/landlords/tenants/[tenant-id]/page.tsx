"use client";
import TenantPaymentReceiptCard from "@/components/landlord/TenantPaymentReceiptCard";
import { DatePicker } from "@/components/reuseables/DatePicker";
import SearchInput from "@/components/reuseables/SearchInput";
import StatCard from "@/components/reuseables/StatCard";
import { Backpack, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  return (
    <section>
      <div className="grid grid-cols-4 bg-red- w-[95%] mx-auto gap-5">
        {[...Array(4)].map((_, index) => {
          return (
            <StatCard
              key={index}
              icon={<Backpack className="text-gray-600" size={17} />}
              title={"Total Balance"}
              stat="D2,000"
            />
          );
        })}
      </div>
      <div className="mt-10 pb-10 p-5 rounded-2xl w-[95%] mx-auto bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-lg text-black">
              Sulayman's Payment History (#203949)
            </h1>
            <p className="text-gray-500 text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
            </p>
          </div>
          <button
            onClick={() => {
              router.push("/landlords/add-receipt-form");
            }}
            className="flex shadow-sm inset-shadow-2xs items-center gap-1 cursor-pointer hover:bg-cyan-600/90 transition bg-cyan-500 text-white font-semibold px-3 whitespace-nowrap py-[10px] text-xs rounded-md"
          >
            <PlusIcon className="size-4" />
            Add Receipt
          </button>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex-[0.6]">
            <SearchInput placeholder="Search by name, receipt no..." />
          </div>
          <div>
            <DatePicker placeholder="Select Date" />
          </div>
        </div>
      </div>

      {[...Array(20)].map((_, index) => (
        <TenantPaymentReceiptCard key={index} />
      ))}
    </section>
  );
}

export default page;
