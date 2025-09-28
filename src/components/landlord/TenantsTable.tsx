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

import { PlusIcon } from "lucide-react";
import { Filter } from "./Filter";
import { useRouter } from "next/navigation";

export default function TenantsTable() {
  const router = useRouter();
  return (
    <div className="relative w-full mx-auto mt-10 ">
      <div className="flex justify-between items-center border-t border-x border-gray-200 p-5 rounded-t-2xl bg-white">
        <div>
          <h1 className="font-semibold text-lg text-gray-800">Tenants</h1>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 cursor-pointer hover:bg-cyan-600/90 transition bg-cyan-500 text-white font-semibold px-4 whitespace-nowrap py-[10px] text-xs rounded-xl">
            <PlusIcon className="size-4" />
            Add Landlord
          </button>
        </div>
      </div>
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto rounded-b-2xl border border-gray-200 py-7 bg-white">
        <Table
          className="table table-fixed min-w-full"
          removeWrapper
          aria-label="Drivers"
          shadow="sm"
          isHeaderSticky
          bottomContent={
            <div className="flex w-full justify-center mt-10">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={1}
                total={2}
                // onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader className="bg-cyan-600">
            <TableColumn
              key="id"
              className="min-w-[120px] text-gray-800 text-sm"
            >
              ID
            </TableColumn>
            <TableColumn
              key="name"
              className="min-w-[120px] text-gray-800 text-sm"
            >
              Name
            </TableColumn>
            <TableColumn
              key="phoneNumber"
              className="min-w-[160px] text-gray-800 text-sm"
            >
              Property Location
            </TableColumn>

            <TableColumn
              key="address"
              className="min-w-[140px] text-gray-800 text-sm"
            >
              Rent (monthly)
            </TableColumn>

            <TableColumn
              key="email"
              className="min-w-[140px] text-gray-800 text-sm"
            >
              Phone Number
            </TableColumn>
            <TableColumn
              key="phoneNumber"
              className="min-w-[100px] text-gray-800 text-sm"
            >
              Status
            </TableColumn>
            <TableColumn
              key="phoneNumber"
              className="min-w-[100px] text-gray-800 text-sm"
            >
              {undefined}
            </TableColumn>
          </TableHeader>
          <TableBody
            // isLoading={false}
            loadingContent={
              <Spinner color="danger" label="loading drivers..." />
            }
            emptyContent={
              true ? "No drivers match your search" : "No drivers found"
            }
          >
            {[...Array(7)].map((driver: any, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 cursor-pointer transition-all"
                onClick={() => router.push("/landlords/323232/30400230")}
              >
                <TableCell className="min-w-[120px] pl-6">
                  <p className="text-gray-500 text-xs font-medium whitespace-nowrap text-center">
                    #2030402
                  </p>
                </TableCell>
                <TableCell className="min-w-[120px] pl-6">
                  <p className="text-gray-500 text-xs font-medium whitespace-nowrap text-center">
                    John Doe Smith
                  </p>
                </TableCell>
                <TableCell className="min-w-[160px] text-center text-gray-500 text-xs">
                  123 Main St, City
                </TableCell>
                <TableCell className="min-w-[140px] text-center text-gray-500 text-xs">
                  $2,500/month
                </TableCell>

                <TableCell className="min-w-[140px] text-center text-gray-500 text-xs">
                  +1 234-567-8900
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-500 text-center min-w-[100px]">
                  {<Status paymentStatus="Pending" />}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-500 text-center min-w-[100px]">
                  <Filter />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const Status = ({ paymentStatus }: { paymentStatus: string }) => {
  return (
    <p
      className={`${
        paymentStatus === "Paid"
          ? "bg-green-100 border border-green-200 text-green-700"
          : "bg-red-100 border border-red-200 text-red-700 animate-pulse"
      } px-2 py-1 rounded-full font-medium text-xs`}
    >
      {paymentStatus}
    </p>
  );
};
