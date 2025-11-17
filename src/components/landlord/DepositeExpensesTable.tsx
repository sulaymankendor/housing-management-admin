"use client";
import React from "react";
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
import { ExpenseActions } from "./ExpenseActions";
import { LoadingSpinner } from "../reuseables/LoadingSpinner";
import { formatPrice } from "@/lib/formatPrice";
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

function DepositeExpensesTable({
  depositeExpenses,
  depositeExpensesRequest,
}: {
  depositeExpenses: any[];
  depositeExpensesRequest: {
    isLoading: boolean;
    axiosRequestError: string;
  };
}) {
  return (
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
            key="tenant"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Tenant
          </TableColumn>
          <TableColumn
            key="propertyLocation"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px] text-center"
          >
            Property Location
          </TableColumn>
          <TableColumn
            key="propertyType"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px] text-center"
          >
            Property Type
          </TableColumn>

          <TableColumn
            key="depositedAmount"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Deposited Amount
          </TableColumn>
          <TableColumn
            key="expendedAmount"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Expended Amount
          </TableColumn>
          <TableColumn
            key="items"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Items
          </TableColumn>
          <TableColumn
            key="depositedDate"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Deposited Date
          </TableColumn>

          <TableColumn
            key="actions"
            className="min-w-[100px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            {undefined}
          </TableColumn>
        </TableHeader>
        <TableBody
          // isLoading={false}
          isLoading={depositeExpensesRequest.isLoading}
          loadingContent={<LoadingSpinner />}
          emptyContent={
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-gray-500 text-sm">No deposite expense found</p>
            </div>
          }
          items={depositeExpenses}
        >
          {depositeExpenses?.map((expense: any) => (
            <TableRow key={expense.id} className={`border-b`}>
              <TableCell className="min-w-[160px] py-5">
                <p className="text-gray-800 text-xs text-center font-medium whitespace-nowrap">
                  {expense.tenantName}
                </p>
              </TableCell>
              <TableCell className="min-w-[160px]  py-5">
                <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                  {expense.propertyLocation}
                </p>
              </TableCell>
              <TableCell className="min-w-[160px]  py-5">
                <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                  {expense.propertyType}
                </p>
              </TableCell>

              <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                D{formatPrice(expense.depositedAmount)}
              </TableCell>
              <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                D{formatPrice(expense.expendedAmount)}
              </TableCell>
              <TableCell className="min-w-[160px] flex gap-2 text-center justify-center py-5 text-gray-800 text-xs">
                {expense.items.map((item: string, index: number) => {
                  return (
                    <p
                      key={index}
                      className="text-gray-800 text-xs text-center font-medium whitespace-nowrap"
                    >
                      {item}
                      {index + 1 !== depositeExpenses?.length - 1 && ","}
                    </p>
                  );
                })}
              </TableCell>
              <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                {expense.depositedDate}
              </TableCell>

              <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-800 text-center min-w-[100px]">
                <ExpenseActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center mt-5">
        {depositeExpenses?.length > 0 && (
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
  );
}

export default DepositeExpensesTable;

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
