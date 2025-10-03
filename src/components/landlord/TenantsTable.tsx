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

export default function Tenants() {
  const router = useRouter();
  return (
    <div className="relative w-full mx-auto mt-10 ">
      <div className="flex justify-between items-center border-t border-x border-gray-200 p-5 rounded-t-2xl bg-white">
        <div>
          <h1 className="font-semibold text-lg text-black">Tenants</h1>
          <p className="text-gray-500 text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              router.push("/landlords/add-tenant-form");
            }}
            className="flex shadow-sm inset-shadow-2xs items-center gap-1 cursor-pointer hover:bg-cyan-600/90 transition bg-cyan-500 text-white font-semibold px-3 whitespace-nowrap py-[10px] text-xs rounded-md"
          >
            <PlusIcon className="size-4" />
            Add Tenant
          </button>
        </div>
      </div>
      {/* Horizontal scroll container */}
      <div className="overflow-x-hidden h-[155vh] rounded-b-2xl border border-gray-200 bg-white">
        <Table
          className="table table-fixed min-w-full"
          removeWrapper
          aria-label="Drivers"
          shadow="sm"
          isHeaderSticky
          bottomContent={
            <div className="flex w-full justify-center mt-5">
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
            </div>
          }
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
              key="property-location"
              className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
            >
              Property Location
            </TableColumn>

            <TableColumn
              key="rent"
              className="min-w-[140px] bg-gray-100 font-semibold border-b text-black text-[13px]"
            >
              Rent (monthly)
            </TableColumn>

            <TableColumn
              key="phone-number"
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
            // isLoading={false}
            loadingContent={
              <Spinner color="danger" label="loading drivers..." />
            }
            emptyContent={
              true ? "No drivers match your search" : "No drivers found"
            }
          >
            {[...Array(10)].map((driver: any, index) => (
              <TableRow
                key={index}
                className={` hover:bg-gray-100 border-b cursor-pointer transition-all`}
                onClick={() => router.push("/landlords/tenants/21212")}
              >
                <TableCell className="min-w-[120px] pl-6 py-5">
                  <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                    #2030402
                  </p>
                </TableCell>
                <TableCell className="min-w-[120px] pl-6 py-5">
                  <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                    John Doe Smith
                  </p>
                </TableCell>
                <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                  123 Main St, City
                </TableCell>
                <TableCell className="min-w-[140px] text-center py-5 text-gray-800 text-xs">
                  D2,500
                </TableCell>

                <TableCell className="min-w-[140px] text-center py-5 text-gray-800 text-xs">
                  +1 234-567-8900
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-800 text-center min-w-[100px]">
                  {<Status paymentStatus="Pending" />}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-800 text-center min-w-[100px]">
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
