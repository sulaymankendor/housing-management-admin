import { ArrowRight } from "lucide-react";
import React from "react";
import { Filter } from "./Filter";

function TenantPaymentReceiptCard() {
  return (
    <div className="flex items-center justify-between mt-5 px-5 py-4 rounded-lg bg-white w-[95%] mx-auto">
      <div>
        <h1 className="font-semibold text-[12.5px] text-gray-800">
          Receipt No.
        </h1>
        <p className="font-medium text-gray-700 text-center text-xs">000392</p>
      </div>
      <div>
        <h1 className="text-center font-semibold text-[12.5px] text-gray-800">
          Payments <span className="font-medium">(Wave)</span>
        </h1>
        <div className="flex items-center gap-1">
          <p className="font-medium text-gray-700 text-xs">John Doe</p>
          <ArrowRight size={15} className="text-gray-700" />
          <p className="font-medium text-gray-700 text-xs">Sulayman Kendor</p>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-[12.5px] text-gray-800 text-center">
          Amount
        </h1>
        <p className="font-medium text-gray-700 text-xs text-center">D21,000</p>
      </div>
      <div>
        <h1 className="font-semibold text-[12.5px] text-gray-800">
          Property Type
        </h1>
        <p className="font-medium text-gray-700 text-xs text-center">
          Apartment
        </p>
      </div>
      <div>
        <h1 className="font-semibold text-[12.5px] text-gray-800 text-center">
          Date
        </h1>
        <p className="font-medium text-gray-700 text-xs text-center">
          12 March 2025
        </p>
      </div>
      <Filter />
    </div>
  );
}

export default TenantPaymentReceiptCard;
