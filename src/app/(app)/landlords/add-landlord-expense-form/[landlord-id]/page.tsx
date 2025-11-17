"use client";
import { CustomSelectInput } from "@/components/reuseables/CustomSelectInput";
import { DatePicker } from "@/components/reuseables/DatePicker";
import { SelectExpenseItems } from "@/components/reuseables/SelectExpenseItems";
import { Input } from "@/components/ui/input";
import { axisoRequest } from "@/lib/axiosRequest";
import { listOfPropertyTypes } from "@/lib/data";
import { formatDate } from "@/lib/formatDate";
import { expenseType, landlordType, tenantType } from "@/lib/types";
import { expenseSchema, tenantSchema } from "@/lib/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function AddLandlordExpenseForm() {
  const params = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<expenseType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      tenantID: "",
      tenantName: "",
      totalAmount: "",
      items: [],
      date: "",
      propertyLocation: "",
      propertyType: "",
    },
  });

  const [expensesRequest, setExpensesRequest] = useState({
    isLoading: false,
    axiosRequestError: "",
  });

  const onSubmit = async (data: expenseType) => {
    axisoRequest.post(
      "landlordExpenses",
      {
        ...data,
        date: formatDate(data.date),
        //@ts-ignore
        landlordID: params["landlord-id"],
        amountPaid: "0",
        amountDue: data.totalAmount,
        status: "Uncharged",
      },
      setExpensesRequest,
      reset
    );
  };
  return (
    <div className="bg-white p-10 rounded-2xl border border-gray-200">
      <div>
        <h1 className="font-semibold text-lg text-black">
          Add a Landlord Expense
        </h1>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Input
              placeholder="Tenant"
              id="tenant"
              {...register("tenantName")}
            />
            {errors.tenantName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.tenantName.message}
              </p>
            )}
          </div>
          <div className="grid w-full">
            <Input
              placeholder="Property Location"
              id="propertyLocation"
              {...register("propertyLocation")}
            />
            {errors.propertyLocation && (
              <p className="mt-1 text-xs text-red-600">
                {errors.propertyLocation.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Move in date is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <DatePicker
                    width="w-full"
                    dateValue={field.value}
                    onChange={field.onChange}
                    placeholder="Date"
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
          <div className="grid w-full">
            <Input
              placeholder="Total Amount"
              id="totalAmount"
              {...register("totalAmount")}
              type="number"
            />
            {errors.totalAmount && (
              <p className="mt-1 text-xs text-red-600">
                {errors.totalAmount.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="propertyType"
              control={control}
              render={({ field, fieldState }) => (
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
          <div className="grid w-full">
            <Controller
              name="tenantID"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelectInput
                  placeholder="Tenant ID"
                  items={["#220202", "#202002", "#21212"]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {errors.tenantID && (
              <p className="mt-1 text-xs text-red-600">
                {errors.tenantID.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="items"
              control={control}
              render={({ field, fieldState }) => (
                <SelectExpenseItems
                  placeholder="Select Items"
                  items={["dasd", "asd"]}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            {errors.items && (
              <p className="mt-1 text-xs text-red-600">
                {errors.items.message}
              </p>
            )}
          </div>
        </div>
        <button className="py-[9px] mt-10 text-[13px] px-6 text-white rounded-md w-full bg-cyan-600/90 transition hover:bg-cyan-500 cursor-pointer">
          {expensesRequest.isLoading ? "Adding..." : "Add"}
        </button>
      </form>
      {expensesRequest.axiosRequestError && (
        <p className="mt-1 text-xs text-center text-red-600">
          {expensesRequest.axiosRequestError}
        </p>
      )}
    </div>
  );
}

export default AddLandlordExpenseForm;
