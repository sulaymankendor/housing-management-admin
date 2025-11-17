"use client";
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { AlertCircle, CheckCircle, PlusIcon, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchInput from "../reuseables/SearchInput";
import { FilterTable } from "../reuseables/FilterTable";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../reuseables/LoadingSpinner";
import { formatPrice } from "@/lib/formatPrice";
import { ExpenseActions } from "../landlord/ExpenseActions";
import { axisoRequest } from "@/lib/axiosRequest";
import { searchExpenditures } from "@/lib/searchFunctions";
import { CustomSelectInput } from "../reuseables/CustomSelectInput";
import { expenseTypes } from "@/lib/data";

function ExpendituresTable() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [filterExpenseType, setFilterExpenseType] = useState("All Expenses");

  const [expendituresRequest, setExpendituresRequest] = useState({
    isLoading: true,
    axiosRequestError: "",
  });
  const [expenditures, setExpenditures] = useState({
    expenditures: [],
    searchedExpenditures: [],
  });

  useEffect(() => {
    const getExpenditures = async () => {
      const fetchedExpenditures = await axisoRequest.get(
        "expenditures",
        setExpendituresRequest
      );
      setExpenditures({
        expenditures: fetchedExpenditures,
        searchedExpenditures: fetchedExpenditures,
      });
    };
    getExpenditures();
  }, []);

  //search functionality
  useEffect(() => {
    // setFilterExpenseType("All Expense");
    if (searchText !== "") {
      searchExpenditures(
        expenditures.expenditures,
        setExpenditures,
        searchText
      );
    } else if (expenditures.expenditures.length > 0 && searchText === "") {
      setExpenditures((prevExpendituresState) => {
        return {
          ...prevExpendituresState,
          searchedExpenditures: expenditures.expenditures,
        };
      });
    }
  }, [searchText]);

  //filter functionality
  useEffect(() => {
    if (filterExpenseType) {
      if (filterExpenseType === "All Expense") {
        setExpenditures((prevExpendituresState) => {
          return {
            ...prevExpendituresState,
            searchedExpenditures: expenditures.expenditures,
          };
        });
      } else if (filterExpenseType === "Office Expense") {
        const filteredExpendituers = expenditures.expenditures.filter(
          (expenditure) => expenditure.expenseType === "Office Expense"
        );
        console.log(filteredExpendituers);
        setExpenditures((prevExpendituresState) => {
          return {
            ...prevExpendituresState,
            searchedExpenditures: filteredExpendituers,
          };
        });
      } else if (filterExpenseType === "Tafsirr Expense") {
        const filteredExpendituers = expenditures.expenditures.filter(
          (expenditure) => expenditure.expenseType === "Tafsirr Expense"
        );
        console.log(filteredExpendituers);

        setExpenditures((prevExpendituresState) => {
          return {
            ...prevExpendituresState,
            searchedExpenditures: filteredExpendituers,
          };
        });
      }
    }
  }, [filterExpenseType]);
  return (
    <div className="relative w-full mx-auto mt-10">
      <div className="border-t border-x border-gray-200 p-5 rounded-t-2xl bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-lg text-black">Expenditures</h1>
            <p className="text-gray-500 text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                router.push(`/expenditures/add-expense`);
              }}
              className="flex shadow-sm inset-shadow-2xs items-center gap-1 capitalize cursor-pointer hover:bg-cyan-600/90 transition bg-cyan-500 text-white font-semibold px-3 whitespace-nowrap py-[10px] text-xs rounded-md"
            >
              <PlusIcon className="size-4" />
              Add Expenture
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex-[0.5]">
            <SearchInput
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Search by expense by..."
              setFilter={setFilterExpenseType}
              filter={filterExpenseType}
            />
          </div>
          <div>
            <CustomSelectInput
              width={"w-[8.5rem]"}
              items={expenseTypes}
              value={filterExpenseType}
              onChange={(expense) => {
                if (searchText !== "") {
                  setSearchText("");
                }
                setFilterExpenseType(expense);
              }}
            />
          </div>
        </div>
      </div>
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto pb-10 rounded-b-2xl border border-gray-200 bg-white">
        <div className="flex flex-col min-h-[50vh]">
          <Table
            className={"table table-fixed min-w-full flex-grow"}
            removeWrapper
            aria-label="Drivers"
            shadow="sm"
            isHeaderSticky
          >
            <TableHeader>
              <TableColumn
                key="property-location"
                className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
              >
                Expense By
              </TableColumn>
              <TableColumn
                key="id"
                className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
              >
                Items
              </TableColumn>
              <TableColumn
                key="name"
                className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px] text-center"
              >
                Amount
              </TableColumn>
              <TableColumn
                key="propertyType"
                className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px] text-center"
              >
                Payment Method
              </TableColumn>

              <TableColumn
                key="move-in-date"
                className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
              >
                Expense Type
              </TableColumn>

              <TableColumn
                key="date"
                className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
              >
                Date
              </TableColumn>

              <TableColumn
                key="actions"
                className="min-w-[100px] bg-gray-100 font-semibold border-b text-black text-[13px]"
              >
                {undefined}
              </TableColumn>
            </TableHeader>
            <TableBody
              isLoading={expendituresRequest.isLoading}
              loadingContent={<LoadingSpinner />}
              emptyContent={
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-gray-500 text-sm">No expenditure found</p>
                </div>
              }
              items={expenditures.searchedExpenditures}
            >
              {expenditures.searchedExpenditures?.map((expense: any) => (
                <TableRow key={expense.id} className={`border-b`}>
                  <TableCell className="min-w-[160px]  py-5">
                    <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                      {expense.expenseBy}
                    </p>
                  </TableCell>
                  <TableCell className="min-w-[160px] flex gap-2 text-center justify-center py-5 text-gray-800 text-xs">
                    {expense.items.map((item: string, index: number) => {
                      return (
                        <p
                          key={index}
                          className="text-gray-800 text-xs text-center font-medium whitespace-nowrap"
                        >
                          {item}
                          {index + 1 === expense.items.length - 1 && ","}
                        </p>
                      );
                    })}
                  </TableCell>
                  <TableCell className="min-w-[160px] py-5">
                    <p className="text-gray-800 text-xs text-center font-medium whitespace-nowrap">
                      D{formatPrice(expense.amount)}
                    </p>
                  </TableCell>

                  <TableCell className="min-w-[160px]  py-5">
                    <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                      {expense.paymentMethod}
                    </p>
                  </TableCell>

                  <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                    {expense.expenseType}
                  </TableCell>

                  <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                    {expense.date}
                  </TableCell>

                  <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-800 text-center min-w-[100px]">
                    <ExpenseActions />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full justify-center mt-5">
            {expenditures.expenditures?.length > 0 && (
              <Pagination
                isCompact
                showControls={false}
                showShadow
                color="secondary"
                page={1}
                total={24}
                classNames={{
                  wrapper:
                    "gap-0 overflow-visible h-8 rounded border border-divider",
                  item: "w-8 h-8 text-small rounded-none bg-transparent",
                  cursor: "!bg-red-500 !text-white font-bold shadow-lg",
                }}
                // onChange={(page) => setPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpendituresTable;

const Status = ({ paymentStatus }: { paymentStatus: string }) => {
  return (
    <div
      className={`${
        paymentStatus === "Charged"
          ? "bg-green-100 border border-green-200 text-green-700"
          : "bg-red-100 border border-red-200 text-red-700 animate-pulse"
      } px-5 py-2 rounded-full font-medium text-xs w-fit mx-auto flex items-center gap-1`}
    >
      {paymentStatus === "Charged" ? (
        <CheckCircle size={15} />
      ) : paymentStatus === "Partial" ? (
        <TrendingUp size={15} />
      ) : (
        <AlertCircle size={15} />
      )}
      <p>{paymentStatus}</p>
    </div>
  );
};
