import { CustomSelectInput } from "@/components/reuseables/CustomSelectInput";
import { DatePicker } from "@/components/reuseables/DatePicker";
import { Input } from "@/components/ui/input";
import { ArrowRight, CircleArrowRight } from "lucide-react";
import React from "react";

function AddReceiptForm() {
  return (
    <div className="bg-white p-10 rounded-2xl">
      <div>
        <h1 className="font-semibold text-lg text-black">Add a Receipt</h1>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesent
        </p>
      </div>
      <form>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <Input placeholder="Receipt Number" type="number" />

          <Input placeholder="Amount" type="number" />
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          {/* <CustomSelectInput
            placeholder="Property Location"
            items={["Apartment", "Shop"]}
          />
          <CustomSelectInput
            placeholder="Property Type"
            items={["Apartment", "Shop"]}
          /> */}
          <Input placeholder="Received from" />
          <div className="w-10">
            <CircleArrowRight size={20} className="text-gray-700" />
          </div>

          <Input placeholder="Paid to" />
        </div>
        <div className="flex items-center gap-5 mx-auto mt-10">
          <CustomSelectInput
            placeholder="Property Type"
            items={["Apartment", "Shop"]}
          />
          <DatePicker width={"w-full"} placeholder="Payment Date" />
          <CustomSelectInput
            placeholder="Payment Method"
            items={["Bank", "Wave", "Cash"]}
          />{" "}
        </div>
        <button className="py-[9px] mt-10 text-[13px] px-6 text-white rounded-md w-full bg-cyan-600/90 transition hover:bg-cyan-500 cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddReceiptForm;
