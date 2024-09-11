import React from "react";

const HeadBar = () => {
  return (
    <div className="stcicky top-0 flex bg-gray-100 h-6 w-full font-opensauce font-medium	text-[11px] text-gray-600 pr-8 py-4  items-center justify-between">
      <div className="flex flex-row pl-10 gap-2 items-center">
        <img src="https://img.icons8.com/?size=100&id=AgpNCyq2TYrv&format=png&color=848080" alt="bagicon" width={16} />
        Angkringan 151 E-commerce
      </div>
      <div className="flex gap-7 font-opensauce text-[11px]">
        <a className="hover:text-orange-400" href="">
          <p>Tentang Angkringan 151</p>
        </a>
        <a className="hover:text-orange-400" href="">
          <p>Hubungi Kami</p>
        </a>
        <a className="hover:text-orange-400" href="">
          <p>Mulai Berjualan</p>
        </a>
        <a className="hover:text-orange-400" href="">
          <p>Bantuan</p>
        </a>
      </div>
    </div>
  );
};

export default HeadBar;
