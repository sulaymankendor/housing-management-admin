"use client";

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import { PlusIcon } from "lucide-react";
// import { LandlordActions } from "./LandlordActions";
import { useRouter } from "next/navigation";
import SearchInput from "../reuseables/SearchInput";
import { FilterTable } from "../reuseables/FilterTable";
import { useEffect, useState } from "react";
import { axisoRequest } from "@/lib/axiosRequest";
import { LoadingSpinner } from "../reuseables/LoadingSpinner";
import { searchLandlords } from "@/lib/searchFunctions";

export default function LandlordsTable() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [landlordsRequest, setLandlordsRequest] = useState({
    isLoading: true,
    axiosRequestError: "",
  });
  const [landlords, setLandlords] = useState({
    landlords: [],
    searchedLanlords: [],
  });

  useEffect(() => {
    const getLandlords = async () => {
      const fetchedLandlords = await axisoRequest.get(
        "landlords",
        setLandlordsRequest
      );
      setLandlords({
        landlords: fetchedLandlords,
        searchedLanlords: fetchedLandlords,
      });
    };
    getLandlords();
  }, []);

  useEffect(() => {
    if (searchText !== "") {
      searchLandlords(landlords.landlords, setLandlords, searchText);
    } else if (landlords.landlords.length > 0 && searchText === "") {
      setLandlords((prevLandlordsState) => {
        return { ...prevLandlordsState, searchedLanlords: landlords.landlords };
      });
    }
  }, [searchText]);
  return (
    <div className="relative w-full mx-auto mt-10">
      <div className="border-t border-x border-gray-200 p-5 rounded-t-2xl bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-lg text-black">Landlords</h1>
            <p className="text-gray-500 text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                router.push("/landlords/add-landlord-form");
              }}
              className="flex shadow-sm inset-shadow-2xs items-center gap-1 cursor-pointer hover:bg-cyan-600/90 transition bg-cyan-500 text-white font-semibold px-3 whitespace-nowrap py-[10px] text-xs rounded-md"
            >
              <PlusIcon className="size-4" />
              Add Landlord
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-10">
          <div className="flex-[0.5]">
            <SearchInput
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Search by id, name, phone number & property location..."
            />
          </div>
          <div>
            <FilterTable />
          </div>
        </div>
      </div>
      {/* Horizontal scroll container */}
      <div className="overflow-x-hidden pb-10 rounded-b-2xl border border-gray-200 bg-white">
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
                key="phoneNumber"
                className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
              >
                Phone Number
              </TableColumn>
              <TableColumn
                key="propertyLocation"
                className="min-w-[160px] bg-gray-100 font-semibold border-b text-black text-[13px]"
              >
                Property Location
              </TableColumn>

              <TableColumn
                key="actions"
                className="min-w-[100px] bg-gray-100 font-semibold border-b text-black text-[13px]"
              >
                {undefined}
              </TableColumn>
            </TableHeader>
            <TableBody
              isLoading={landlordsRequest.isLoading}
              loadingContent={<LoadingSpinner />}
              emptyContent={
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-gray-500 text-sm">No landlord found</p>
                </div>
              }
              items={landlords.searchedLanlords || []}
            >
              {(landlord: any) => (
                <TableRow
                  key={landlord.id}
                  className={`hover:bg-gray-100 border-b cursor-pointer transition-all`}
                  onClick={() => {
                    router.push(
                      `/landlords/${landlord.landlordID}?name=${landlord.name}`
                    );
                  }}
                >
                  <TableCell className="min-w-[120px] pl-6 py-5">
                    <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                      #{landlord.landlordID}
                    </p>
                  </TableCell>
                  <TableCell className="min-w-[120px] pl-6 py-5">
                    <p className="text-gray-800 text-xs font-medium whitespace-nowrap text-center">
                      {landlord.name}
                    </p>
                  </TableCell>
                  <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                    {landlord.phoneNumber}
                  </TableCell>
                  <TableCell className="min-w-[160px] text-center py-5 text-gray-800 text-xs">
                    {landlord.propertyLocation.map((location, index) => (
                      <div key={index}>
                        <p>
                          {location}{" "}
                          {landlord.propertyLocation.length - 1 !== index &&
                            ","}
                        </p>
                      </div>
                    ))}
                  </TableCell>

                  <TableCell className="whitespace-nowrap px-3 py-5 text-xs text-gray-800 text-center min-w-[100px]">
                    {/* <Filter /> */}
                    sad
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex w-full justify-center mt-5">
          {landlords?.length > 0 && (
            <Pagination
              isCompact
              showControls={false}
              showShadow
              color="secondary"
              page={1}
              total={landlords?.length / 10}
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
  );
}
