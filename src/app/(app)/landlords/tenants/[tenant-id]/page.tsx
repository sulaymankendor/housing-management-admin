"use client";
import TenantPaymentReceiptCard from "@/components/landlord/TenantPaymentReceiptCard";
import { DatePicker } from "@/components/reuseables/DatePicker";
import { FilterTable } from "@/components/reuseables/FilterTable";
import { LoadingSpinner } from "@/components/reuseables/LoadingSpinner";
import SearchInput from "@/components/reuseables/SearchInput";
import StatCard from "@/components/reuseables/StatCard";
import ChargeExtraMoneyIcon from "@/components/svgs/ChargeExtraMoneyIcon";
import CorpInterestExpensesIcon from "@/components/svgs/CorpInterestExpensesIcon";
import SalesAmountIcon from "@/components/svgs/SalesAmountIcon";
import ScopeExpenseClaimsIcon from "@/components/svgs/ScopeExpenseClaimsIcon";
import { axisoRequest } from "@/lib/axiosRequest";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState("");
  const [receiptsRequest, setReceiptsRequest] = useState({
    isLoading: true,
    axiosRequestError: "",
  });
  const [receipts, setReceipts] = useState({
    listOfReceipts: [],
    receiptStats: [
      {
        id: 1,
        title: "Amount Deposited",
        stat: "20000",
        icon: SalesAmountIcon,
      },
      {
        id: 2,
        title: "Total Payment",
        stat: "0",
        icon: ScopeExpenseClaimsIcon,
      },
      { id: 3, title: "das", stat: "0", icon: ChargeExtraMoneyIcon },
      { id: 4, title: "asd", stat: "0", icon: CorpInterestExpensesIcon },
    ],
  });
  useEffect(() => {
    const getReceipts = async () => {
      // const fetchedReceipts = await axisoRequest.get(
      //   "receipts",
      //   setReceiptsRequest
      // );

      const fetchedReceipts = await axisoRequest.getBasedOnID(
        "receipts",
        setReceiptsRequest,
        //@ts-ignore
        params["tenant-id"],
        "tenantID"
      );
      console.log(fetchedReceipts);
      setReceipts({
        listOfReceipts: fetchedReceipts || [],
        receiptStats: [
          ...receipts.receiptStats,
          {
            id: 1,
            title: "Total Payments",
            stat: receipts.listOfReceipts.length.toString(),
            icon: SalesAmountIcon,
          },
        ],
      });
    };
    getReceipts();
  }, []);
  return (
    <section>
      <div className="grid grid-cols-4 gap-5">
        {receipts.receiptStats.map((stat, index) => {
          return (
            <StatCard
              key={index}
              icon={<stat.icon />}
              title={stat.title}
              stat={stat.stat}
            />
          );
        })}
      </div>
      <div className="mt-10 pb-10 p-5 rounded-2xl bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-lg text-black">
              {searchParams.get("name")} Payment History (#{params["tenant-id"]}
              )
            </h1>
            <p className="text-gray-500 text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
            </p>
          </div>
          <button
            onClick={() => {
              router.push(`/landlords/add-receipt-form/${params["tenant-id"]}`);
            }}
            className="flex shadow-sm inset-shadow-2xs items-center gap-1 cursor-pointer hover:bg-cyan-600/90 transition bg-cyan-500 text-white font-semibold px-3 whitespace-nowrap py-[10px] text-xs rounded-md"
          >
            <PlusIcon className="size-4" />
            Add Receipt
          </button>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex-[0.5]">
            <SearchInput
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Search by name, receipt no..."
            />
          </div>
          <div>
            <FilterTable />
          </div>
          {/* <div><DatePicker placeholder="Select Date" /></div> */}
        </div>
      </div>
      <div>
        {receiptsRequest.isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : receipts?.listOfReceipts?.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-sm text-center">
              No receipt found
            </p>
          </div>
        ) : (
          <div>
            {receipts?.listOfReceipts?.map((receipt: any, index) => (
              <TenantPaymentReceiptCard
                key={receipt.id}
                receipt={receipt}
                setListOfReceipts={setReceipts}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Page;
