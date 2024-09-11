import React from "react";

const BuyNowButton = () => {
  return (
    <div className="flex flex-row justify-center items-center xl:p-2 bg-white rounded-sm xl:my-2    transform transition-transform scale-100 hover:scale-105 cursor-pointer border border-orange-500 xl:w-[120px] w-[120px] py-2 font-goto ">
      <div onClick={() => console.log("masuk keranjang bosku")} className="flex flex-row xl:text-sm text-[14px] font-bold font-goto text-orange-400 mt-0.5">
        Beli Sekarang
      </div>
    </div>
  );
};

export default BuyNowButton;
