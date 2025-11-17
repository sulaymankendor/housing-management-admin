"use client";
import { CustomSelectInput } from "@/components/reuseables/CustomSelectInput";
import { DatePicker } from "@/components/reuseables/DatePicker";
import { SelectExpenseItems } from "@/components/reuseables/SelectExpenseItems";
import { Input } from "@/components/ui/input";
import { axisoRequest } from "@/lib/axiosRequest";
import { listOfPaymentMethods, listOfPropertyTypes } from "@/lib/data";
import { formatDate } from "@/lib/formatDate";
import {
  expenditureType,
  expenseType,
  landlordType,
  tenantType,
} from "@/lib/types";
import {
  expenditureSchema,
  expenseSchema,
  tenantSchema,
} from "@/lib/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function AddExpenseForm() {
  const params = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<expenditureType>({
    resolver: zodResolver(expenditureSchema),
    defaultValues: {
      items: [],
      amount: "",
      paymentMethod: "",
      expenseBy: "",
      date: "",
      expenseType: "",
    },
  });

  const [expensesRequest, setExpensesRequest] = useState({
    isLoading: false,
    axiosRequestError: "",
  });

  const onSubmit = async (data: expenditureType) => {
    axisoRequest.post(
      "expenditures",
      //@ts-ignore
      { ...data, date: formatDate(data.date) },
      setExpensesRequest,
      reset
    );
  };
  return (
    <div className="bg-white p-10 rounded-2xl border border-gray-200">
      <div>
        <h1 className="font-semibold text-lg text-black">Add an Expenditure</h1>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="expenseType"
              control={control}
              render={({ field }) => (
                <CustomSelectInput
                  placeholder="Expense Type"
                  items={["Office Expense", "Tafsirr Expense"]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {errors.expenseType && (
              <p className="mt-1 text-xs text-red-600">
                {errors.expenseType.message}
              </p>
            )}
          </div>
          <div className="grid w-full">
            <Input
              placeholder="Expense By"
              id="expenseBy"
              {...register("expenseBy")}
            />
            {errors.expenseBy && (
              <p className="mt-1 text-xs text-red-600">
                {errors.expenseBy.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field, fieldState }) => (
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
          <div className="grid w-full">
            <Input
              placeholder="Amount"
              type="number"
              id="amount"
              {...register("amount")}
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
          <div className="grid w-full">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Expense Date is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <DatePicker
                    width="w-full"
                    dateValue={field.value}
                    onChange={field.onChange}
                    placeholder="Expense Date"
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

export default AddExpenseForm;
