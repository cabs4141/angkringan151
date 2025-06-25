import React from "react";

const CartButton = ({ title, img, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-row justify-center items-center w-[150px] xl:w-auto xl:p-2 py-1.5 bg-blue-400 rounded-sm xl:my-2 my-1 gap-2  transform transition-transform scale-100 hover:scale-105 cursor-pointer">
      <div>
        <img className="top-0 xl:w-[22px] w-[16px]" src={img} />
      </div>
      <div className="flex felx-row xl:text-sm text-[11px]  font-goto text-white mt-0.5">{title}</div>
    </div>
  );
};

export default CartButton;
