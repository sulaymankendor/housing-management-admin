"use client";
import { CustomSelectInput } from "@/components/reuseables/CustomSelectInput";
import { DatePicker } from "@/components/reuseables/DatePicker";
import { Input } from "@/components/ui/input";
import { axisoRequest } from "@/lib/axiosRequest";
import {
  listOfMonths,
  listOfPaymentMethods,
  listOfPropertyTypes,
} from "@/lib/data";
import { formatDate } from "@/lib/formatDate";
import { receiptType } from "@/lib/types";
import { receiptSchema } from "@/lib/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function AddReceiptForm() {
  const params = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<receiptType>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      receiptNumber: "",
      receivedFrom: "",
      propertyType: "",
      paidTo: "",
      amount: "",
      monthPaidFor: "",
      paymentDate: "",
      paymentMethod: "",
      receivedFromPhoneNumber: "",
    },
  });

  const [receiptsRequest, setReceiptsRequest] = useState({
    isLoading: false,
    axiosRequestError: "",
  });

  const onSubmit = async (data: receiptType) => {
    axisoRequest.post(
      "receipts",
      //@ts-ignore
      {
        ...data,
        paymentDate: formatDate(data.paymentDate),
        tenantID: params["tenant-id"],
      },
      setReceiptsRequest,
      reset
    );
  };
  return (
    <div className="bg-white p-10 rounded-2xl border border-gray-200">
      <div>
        <Image
          width={2000}
          height={2000}
          className="size-20 rounded-full mx-auto"
          src={"/trust-agency-logo.png"}
          alt="trust-agency-logo"
        />
        <div className="mt-3 mx-auto w-fit">
          <h1 className="text-base text-center text-black ">Trust Agency</h1>
          <p className="text-xs text-gray-600">
            Your NO. 1 HOUSING ESTATE AGENCY - GAMBIA
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-8">
          <h1 className="text-gray-600 text-sm">
            <span className="font-medium text-black">CEO:</span> Tafsir Jallow
          </h1>
          <p className="text-gray-600 text-sm my-[2px]">
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
        <h1 className="font-semibold text-lg text-black">Add a Receipt</h1>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Input
              id="receiptNumber"
              {...register("receiptNumber")}
              placeholder="Receipt Number"
              type="number"
            />

            {errors.receiptNumber && (
              <p className="mt-1 text-xs text-red-600">
                {errors.receiptNumber.message}
              </p>
            )}
          </div>
          <div className="grid w-full">
            <Input
              id="amount"
              {...register("amount")}
              placeholder="Amount"
              type="number"
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-600">
                {errors.amount.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Input
              id="receivedFrom"
              {...register("receivedFrom")}
              placeholder="Received From"
            />
            {errors.receivedFrom && (
              <p className="mt-1 text-xs text-red-600">
                {errors.receivedFrom.message}
              </p>
            )}
          </div>

          <div className="grid w-full">
            <Input id="paidTo" {...register("paidTo")} placeholder="Paid To" />
            {errors.paidTo && (
              <p className="mt-1 text-xs text-red-600">
                {errors.paidTo.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <CustomSelectInput
                  placeholder="Property Type"
                  items={listOfPropertyTypes}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.propertyType && (
              <p className="mt-1 text-xs text-red-600">
                {errors.propertyType.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="paymentDate"
              control={control}
              rules={{ required: "Payment Date is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <DatePicker
                    width={"w-full"}
                    placeholder="Payment Date"
                    dateValue={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="monthPaidFor"
              control={control}
              render={({ field }) => (
                <CustomSelectInput
                  placeholder="Month Paid For"
                  items={listOfMonths}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.monthPaidFor && (
              <p className="mt-1 text-xs text-red-600">
                {errors.monthPaidFor.message}
              </p>
            )}
          </div>
          <div className="grid w-full">
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <CustomSelectInput
                  placeholder="Payment Method"
                  items={listOfPaymentMethods}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.paymentMethod && (
              <p className="mt-1 text-xs text-red-600">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Input
              id="Received From Phone Number"
              {...register("receivedFromPhoneNumber")}
              placeholder="Received From Phone Number"
              type="number"
            />
            {errors.receivedFromPhoneNumber && (
              <p className="mt-1 text-xs text-red-600">
                {errors.receivedFromPhoneNumber.message}
              </p>
            )}
          </div>
        </div>
        <button className="py-[9px] mt-10 text-[13px] px-6 text-white rounded-md w-full bg-cyan-600/90 transition hover:bg-cyan-500 cursor-pointer">
          {receiptsRequest.isLoading ? "Adding..." : "Add"}
        </button>
      </form>
      {receiptsRequest.axiosRequestError && (
        <p className="mt-1 text-xs text-center text-red-600">
          {receiptsRequest.axiosRequestError}
        </p>
      )}
    </div>
  );
}

export default AddReceiptForm;
