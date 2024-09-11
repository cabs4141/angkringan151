import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectComp() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select size="sm" label="Select an animal" className="max-w-xs">
          <SelectItem>Harga Terendah</SelectItem>
        </Select>
        <Select size="sm" label="Favorite Animal" placeholder="Select an animal" className="max-w-xs">
          <SelectItem>Anjay</SelectItem>
        </Select>
      </div>
    </div>
  );
}
