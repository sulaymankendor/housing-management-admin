"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EllipsisIcon from "../svgs/EllipsisIcon";
import { useRouter } from "next/navigation";
import { Trash, Trash2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { axisoRequest } from "@/lib/axiosRequest";

export function ReceiptActions({
  setListOfReceipts,
  receiptID,
}: {
  setListOfReceipts: React.Dispatch<React.SetStateAction<never[]>>;
  receiptID: string;
}) {
  const router = useRouter();
  const [receiptRequest, setReceiptRequest] = useState({
    isLoading: false,
    axiosRequestError: "",
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="size-8 p-2 cursor-pointer hover:bg-gray-200 transition-colors rounded-full shadow-none border-none"
        >
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setListOfReceipts((currentListOfReceipts) =>
              currentListOfReceipts.filter(
                (receipt: any) => receipt.id !== receiptID
              )
            );
            axisoRequest.delete(receiptID, "receipts", setReceiptRequest);
          }}
          className="focus:bg-red-200 bg-red-100 cursor-pointer mt-1"
        >
          <div className="flex gap-1 items-center">
            <Trash2Icon size={15} className="text-red-700" />
            <p className="text-red-700">Delete</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
