"use client";
import { CustomSelectInput } from "@/components/reuseables/CustomSelectInput";
import { DatePicker } from "@/components/reuseables/DatePicker";
import { SelectMonths } from "@/components/reuseables/SelectMonths";
import { Input } from "@/components/ui/input";
import { axisoRequest } from "@/lib/axiosRequest";
import { listOfMonths, listOfPropertyTypes } from "@/lib/data";
import { formatDate } from "@/lib/formatDate";
import { tenantType } from "@/lib/types";
import { tenantSchema } from "@/lib/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function AddTenantForm() {
  const params = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<tenantType>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      propertyLocation: "",
      moveInDate: "",
      propertyType: "",
      rentFee: "",
    },
  });

  const [tenantsRequest, setTenantsRequest] = useState({
    isLoading: false,
    axiosRequestError: "",
  });

  const onSubmit = async (data: tenantType) => {
    axisoRequest.post(
      "tenants",
      {
        ...data,
        moveInDate: formatDate(data.moveInDate),
        //@ts-ignore
        landlordID: params["landlord-id"],
        status: "pending",
      },
      setTenantsRequest,
      reset
    );
  };
  return (
    <div className="bg-white p-10 rounded-2xl border border-gray-200">
      <div>
        <h1 className="font-semibold text-lg text-black">Add a Tenant</h1>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Input placeholder="Name" id="name" {...register("name")} />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid w-full">
            <Input
              id="phoneNumber"
              placeholder="Phone Number"
              type="number"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Input
              id="propertyLocation"
              placeholder="Property Location"
              {...register("propertyLocation")}
            />
            {errors.propertyLocation && (
              <p className="mt-1 text-xs text-red-600">
                {errors.propertyLocation.message}
              </p>
            )}
          </div>
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
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="moveInDate"
              control={control}
              rules={{ required: "Move in date is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <DatePicker
                    width="w-full"
                    dateValue={field.value}
                    onChange={field.onChange}
                    placeholder="Move in Date"
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
              id="rentFee"
              placeholder="Rent Fee (monthly)"
              type="number"
              {...register("rentFee")}
            />
            {errors.rentFee && (
              <p className="mt-1 text-xs text-red-600">
                {errors.rentFee.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Input
              id="depositedAmount"
              placeholder="Deposited Amount"
              type="number"
              {...register("depositedAmount")}
            />
            {errors.rentFee && (
              <p className="mt-1 text-xs text-red-600">
                {errors.rentFee.message}
              </p>
            )}
          </div>

          <div className="grid w-full">
            <SelectMonths placeholder="select" items={listOfMonths} />

            {errors.rentFee && (
              <p className="mt-1 text-xs text-red-600">
                {errors.rentFee.message}
              </p>
            )}
          </div>
        </div>
        <button className="py-[9px] mt-10 text-[13px] px-6 text-white rounded-md w-full bg-cyan-600/90 transition hover:bg-cyan-500 cursor-pointer">
          {tenantsRequest.isLoading ? "Adding..." : "Add"}
        </button>
      </form>
      {tenantsRequest.axiosRequestError && (
        <p className="mt-1 text-xs text-center text-red-600">
          {tenantsRequest.axiosRequestError}
        </p>
      )}
    </div>
  );
}

export default AddTenantForm;
