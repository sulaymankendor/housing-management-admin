"use client";
import { SelectPropertyLocations } from "@/components/reuseables/SelectPropertyLocations";
import { Input } from "@/components/ui/input";
import { axisoRequest } from "@/lib/axiosRequest";
import { generateID } from "@/lib/generateID";
import { landlordType } from "@/lib/types";
import { landlordSchema } from "@/lib/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";

function AddLandlordForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<landlordType>({
    resolver: zodResolver(landlordSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      propertyLocation: [],
    },
  });

  const [propertyLocations, setPropertyLocations] = useState([]);
  const [showPropertyLocationErrorMsg, setShowPropertyLocationErrorMsg] =
    useState(false);
  const [landlordsRequest, setLandlordsRequest] = useState({
    isLoading: false,
    axiosRequestError: "",
  });
  const onSubmit = async (data: landlordType) => {
    axisoRequest.post(
      "landlords",
      //@ts-ignore
      { ...data, landlordID: generateID() },
      setLandlordsRequest,
      reset
    );
  };

  return (
    <div className="bg-white p-10 rounded-2xl border border-gray-200">
      <div>
        <h1 className="font-semibold text-lg text-black">Add a Landlord</h1>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Input id="name" {...register("name")} placeholder="Name" />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid w-full">
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="Phone Number"
              type="number"
            />
            <div>
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <div className="grid w-full">
            <Controller
              name="propertyLocation"
              control={control}
              render={({ field, fieldState }) => (
                <SelectPropertyLocations
                  placeholder="Select property locations"
                  items={["Banjul", "Serre Kunda"]}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            {errors.propertyLocation && showPropertyLocationErrorMsg && (
              <p className="mt-1 text-xs text-red-600">
                {errors.propertyLocation.message}
              </p>
            )}
          </div>

          {/* <CustomSelectInput placeholder="Select" items={["asd", "ads"]} /> */}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={() => {
            if (propertyLocations.length === 0) {
              setShowPropertyLocationErrorMsg(true);
            }
          }}
          className="py-[9px] mt-10 text-[13px] px-6 text-white rounded-md w-full bg-cyan-600/90 transition hover:bg-cyan-500 cursor-pointer"
        >
          {landlordsRequest.isLoading ? "Adding..." : "Add"}
        </button>
      </form>
      {landlordsRequest.axiosRequestError && (
        <p className="mt-1 text-xs text-center text-red-600">
          {landlordsRequest.axiosRequestError}
        </p>
      )}
    </div>
  );
}

export default AddLandlordForm;
