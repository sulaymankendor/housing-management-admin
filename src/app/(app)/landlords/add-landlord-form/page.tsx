import { CustomSelectInput } from "@/components/reuseables/CustomSelectInput";
import { Input } from "@/components/ui/input";
import React from "react";

function AddLandlordForm() {
  return (
    <div className="bg-white p-10 rounded-2xl">
      <div>
        <h1 className="font-semibold text-lg text-black">Add a Landlord</h1>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
        </p>
      </div>
      <form>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <Input placeholder="Name" />
          <Input placeholder="Rent (monthly)" />
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <Input placeholder="Phone Number" />
          <CustomSelectInput placeholder="Select" items={["asd", "ads"]} />
        </div>
        <button className="py-[9px] mt-10 text-[13px] px-6 text-white rounded-md w-full bg-cyan-600/90 transition hover:bg-cyan-500 cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddLandlordForm;
