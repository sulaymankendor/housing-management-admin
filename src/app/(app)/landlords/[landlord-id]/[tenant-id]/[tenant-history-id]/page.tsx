import TenantReceiptCard from "@/components/landlord/TenantReceiptCard";
import { DatePicker } from "@/components/reuseables/DatePicker";
import SearchInput from "@/components/reuseables/SearchInput";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <section>
      <div className="pb-10">
        <h1 className="font-semibold text-xl text-gray-800  w-[90%] min-[1281px]:w-[70%] mx-auto ">
          Payment History
        </h1>
        <p className="text-sm text-gray-600  w-[90%] min-[1281px]:w-[70%] mx-auto ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nisi,
          quis beatae
        </p>
        <div className="flex justify-between items-center gap-4 mt-5  w-[90%] min-[1281px]:w-[70%] mx-auto ">
          <SearchInput />
          <DatePicker />
        </div>
      </div>
      <div className="grid gap-10">
        {[...Array(10)].map((_, index) => {
          return <TenantReceiptCard key={index} />;
        })}
      </div>
    </section>
  );
}

export default page;
