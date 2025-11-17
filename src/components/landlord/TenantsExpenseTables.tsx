"use client";

import { PlusIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SearchInput from "../reuseables/SearchInput";
import { FilterTable } from "../reuseables/FilterTable";
import React from "react";
import TenantsTable from "./TenantsTable";
import LandlordExpensesTable from "./LandlordExpensesTable";
import DepositeExpensesTable from "./DepositeExpensesTable";

export default function Tenants({
  tableToShow,
  setTableToShow,
  searchText,
  setSearchText,
  tenants,
  landlordExpenses,
  landlordExpensesRequest,
  depositeExpenses,
  depositeExpensesRequest,
  tenantsRequest,
}: {
  tableToShow: string;
  setTableToShow: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  tenants: any[];
  landlordExpenses: any[];
  landlordExpensesRequest: {
    isLoading: boolean;
    axiosRequestError: string;
  };
  depositeExpenses: any[];
  depositeExpensesRequest: {
    isLoading: boolean;
    axiosRequestError: string;
  };
  tenantsRequest: {
    isLoading: boolean;
    axiosRequestError: string;
  };
}) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  return (
    <div className="relative w-full mx-auto mt-10">
      <div className="border-t border-x border-gray-200 p-5 rounded-t-2xl bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-lg text-black">
              {searchParams.get("name")}&apos;s Tenants (#
              {params["landlord-id"]})
            </h1>
            <p className="text-gray-500 text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                router.push(
                  tableToShow === "tenant"
                    ? `/landlords/add-tenant-form/${params["landlord-id"]}`
                    : tableToShow === "landlord expense"
                    ? `/landlords/add-landlord-expense-form/${params["landlord-id"]}`
                    : `/landlords/add-deposite-expense-form/${params["landlord-id"]}`
                );
              }}
              className="flex shadow-sm inset-shadow-2xs items-center gap-1 capitalize cursor-pointer hover:bg-cyan-600/90 transition bg-cyan-500 text-white font-semibold px-3 whitespace-nowrap py-[10px] text-xs rounded-md"
            >
              <PlusIcon className="size-4" />
              Add {tableToShow}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex-[0.5]">
            <SearchInput
              placeholder={
                tableToShow === "tenant"
                  ? "Search by id, name, property location & phone number..."
                  : "Search by tenant & property location..."
              }
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </div>
          <div>
            <FilterTable />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-7 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => {
              setTableToShow("tenant");
              setSearchText("");
            }}
            className={`text-xs cursor-pointer font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
              tableToShow === "tenant"
                ? "bg-white text-cyan-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Tenants
          </button>
          <button
            onClick={() => {
              setTableToShow("landlord expense");
              setSearchText("");
            }}
            className={`text-xs cursor-pointer font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
              tableToShow === "landlord expense"
                ? "bg-white text-cyan-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Landlord Expenses
          </button>
          <button
            onClick={() => {
              setTableToShow("deposite expense");
              setSearchText("");
            }}
            className={`text-xs cursor-pointer font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
              tableToShow === "deposite expense"
                ? "bg-white text-cyan-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Deposite Expenses
          </button>
        </div>
      </div>
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto pb-10 rounded-b-2xl border border-gray-200 bg-white">
        {tableToShow === "tenant" ? (
          <TenantsTable tenants={tenants} tenantsRequest={tenantsRequest} />
        ) : tableToShow === "landlord expense" ? (
          <LandlordExpensesTable
            landlordExpenses={landlordExpenses}
            landlordExpensesRequest={landlordExpensesRequest}
          />
        ) : (
          <DepositeExpensesTable
            depositeExpenses={depositeExpenses}
            depositeExpensesRequest={depositeExpensesRequest}
          />
        )}
      </div>
    </div>
  );
}
