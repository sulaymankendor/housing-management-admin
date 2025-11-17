"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { axisoRequest } from "@/lib/axiosRequest";
import { formatDate } from "@/lib/formatDate";
import { LoadingSpinner } from "../reuseables/LoadingSpinner";

function TenantsTable({
  tenants,
  tenantsRequest,
}: {
  tenants: any[];
  tenantsRequest: {
    isLoading: boolean;
    axiosRequestError: string;
  };
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[50vh]">
      <Table
        className={"table table-fixed min-w-full relative flex-grow"}
        removeWrapper
        aria-label="Drivers"
        shadow="sm"
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn
            key="id"
            className="min-w-[120px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            ID
          </TableColumn>
          <TableColumn
            key="name"
            className="min-w-[120px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Name
          </TableColumn>
          <TableColumn
            key="propertyLocation"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Property Location
          </TableColumn>
          <TableColumn
            key="moveInDate"
            className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Move in Date
          </TableColumn>

          <TableColumn
            key="rentFee"
            className="min-w-[140px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Rent Fee
          </TableColumn>

          <TableColumn
            key="phoneNumber"
            className="min-w-[140px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Phone Number
          </TableColumn>
          <TableColumn
            key="status"
            className="min-w-[100px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            Status
          </TableColumn>
          <TableColumn
            key="actions"
            className="min-w-[100px] bg-gray-100 font-semibold border-b text-black text-[13px]"
          >
            {undefined}
          </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={tenantsRequest.isLoading}
          loadingContent={<LoadingSpinner />}
          emptyContent={
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-gray-500 text-sm">No tenant found</p>
            </div>
          }
          items={tenants}
        >
          {tenants?.map((tenant: any) => (
            <TableRow
              key={tenant.id}
              className={` hover:bg-gray-100 border-b cursor-pointer transition-all`}
              onClick={() =>
                router.push(
                  `/landlords/tenants/${tenant.tenantID}?name=${tenant.name}`
                )
              }
            >
              <TableCell className="min-w-[120px] pl-6 py-5">
                <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                  #{tenant.tenantID}
                </p>
              </TableCell>
              <TableCell className="min-w-[120px] pl-6 py-5">
                <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                  {tenant.name}
                </p>
              </TableCell>
              <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                {tenant.propertyLocation} sausud
              </TableCell>
              <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                {tenant.moveInDate}
              </TableCell>
              <TableCell className="min-w-[140px] text-center py-5 text-gray-800 text-xs">
                {tenant.rentFee}
              </TableCell>

              <TableCell className="min-w-[140px] text-center py-5 text-gray-800 text-xs">
                {tenant.phoneNumber}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-800 text-center min-w-[100px]">
                {<Status paymentStatus="Pending" />}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-800 text-center min-w-[100px]">
                {/* <Filter /> */}
                sad
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center mt-5">
        {tenants?.length > 0 && (
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

export default TenantsTable;

const Status = ({ paymentStatus }: { paymentStatus: string }) => {
  return (
    <p
      className={`${
        paymentStatus === "Paid"
          ? "bg-green-100 border border-green-200 text-green-700"
          : "bg-red-100 border border-red-200 text-red-700 animate-pulse"
      } px-5 py-1 rounded-full font-medium text-xs w-fit mx-auto`}
    >
      {paymentStatus}
    </p>
  );
};
