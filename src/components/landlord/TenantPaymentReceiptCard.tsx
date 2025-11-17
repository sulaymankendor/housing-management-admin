import { ArrowRight } from "lucide-react";
import React from "react";
import { ReceiptActions } from "./ReceiptActions";
import { formatPrice } from "@/lib/formatPrice";

function TenantPaymentReceiptCard({
  setListOfReceipts,
  receipt,
}: {
  setListOfReceipts: any;
  receipt: any;
}) {
  return (
    <div className="flex items-center justify-between mt-5 px-5 py-4 rounded-lg bg-white border border-gray-200">
      <div>
        <h1 className="font-semibold text-[12.5px] text-gray-800">
          Receipt No.
        </h1>
        <p className="font-medium text-gray-700 text-center text-xs">
          {receipt.receiptNumber}
        </p>
      </div>
      <div>
        <h1 className="text-center font-semibold text-[12.5px] text-gray-800">
          Payments{" "}
          <span className="font-medium text-xs">({receipt.paymentMethod})</span>
        </h1>
        <div className="flex items-center gap-1">
          <p className="font-medium text-gray-700 text-xs">
            {receipt.receivedFrom}
          </p>
          <ArrowRight size={15} className="text-gray-700" />
          <p className="font-medium text-gray-700 text-xs">{receipt.paidTo}</p>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-[12.5px] text-gray-800 text-center">
          Amount
        </h1>
        <p className="font-medium text-gray-700 text-xs text-center">
          D{formatPrice(receipt.amount)}
        </p>
      </div>
      <div>
        <h1 className="font-semibold text-[12.5px] text-gray-800">
          Property Type
        </h1>
        <p className="font-medium text-gray-700 text-xs text-center">
          {receipt.propertyType}
        </p>
      </div>
      <div>
        <h1 className="font-semibold text-[12.5px] text-gray-800 text-center">
          Month Paid
        </h1>
        <p className="font-medium text-gray-700 text-xs text-center">
          {receipt.monthPaidFor}
        </p>
      </div>
      <ReceiptActions
        receiptID={receipt.id}
        setListOfReceipts={setListOfReceipts}
      />
    </div>
  );
}

export default TenantPaymentReceiptCard;
