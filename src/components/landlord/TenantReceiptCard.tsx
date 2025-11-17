import Image from "next/image";
import React from "react";

function TenantReceiptCard() {
  return (
    <div className="bg-white p-8 w-[90%] min-[1281px]:w-[70%] mx-auto rounded-2xl">
      <div className="flex justify-between">
        <div>
          <Image
            width={2000}
            height={2000}
            className="size-20"
            src={"/trust-agency-logo.png"}
            alt="trust-agency-logo"
          />
          <div className="mt-5">
            <h1 className="font-semibold text-base text-black ">
              Trust Agency
            </h1>
            <p className="text-xs text-gray-600">
              Your NO. 1 HOUSING ESTATE AGENCY - GAMBIA
            </p>
          </div>
        </div>

        <div className="bg-red-100">
          <h1 className="text-gray-600 text-sm">
            <span className="font-medium text-black">CEO:</span> Tafsir Jallow
          </h1>
          <p className="text-gray-600 text-sm">
            <span className="font-medium text-black">Address:</span> Opposite
            Ahmadiya Hospital, Tallinding
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-medium text-black">Tel:</span> +220-7708542 /
            3708542
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-base font-medium text-black">ID #20490303</h1>
        <div className="mt-10 grid gap-3">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-black">Date Issued: </span>20
              March 2025
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-black">Receipt No.:</span>{" "}
              000295
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              {" "}
              <span className="font-medium text-black">Received from: </span>
              Sulayman Kendor
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-black">Property Location:</span>{" "}
              Wellingara
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-black">Payment Amount:</span>{" "}
              D12,000
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-black">Payment Method:</span> GT
              Bank
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-black">Property Type: </span>
              House Apartment
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-black">Landlord:</span> Musa
              Jallow
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            <span className="font-medium text-black">
              Payment For the month:
            </span>{" "}
            January 2025
          </p>
          <div className="flex items-center justify-between w-full min-[1281px]:w-[80%] mx-auto mt-5">
            <p className="text-sm font-medium text-black flex">
              Tenant Sign:{" "}
              <span className="w-[13rem] border-gray-500 border-b border-dashed"></span>
            </p>
            <p className="text-sm font-medium text-black flex">
              Agent Sign:{" "}
              <span className="w-[13rem] border-gray-500 border-b border-dashed"></span>
            </p>
          </div>
        </div>
      </div>
      <p className="text-center mt-10 text-gray-600 text-[13px]">
        With TRUST AGENCY, your confort is guaranteed!!!
      </p>
    </div>
  );
}

export default TenantReceiptCard;
