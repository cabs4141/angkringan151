import React from "react";
import nf from "../../assets/icon/notfound.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" flex xl:mt-[-7%] mt-[-12%] min-h-[500px] mb-30 justify-center items-center font-bauhaus ">
      <div className="flex flex-col items-center">
        <img src={nf} alt="" width={140} />
        <div className="flex items-center gap-2 font-bold xl:text-3xl text-xl  text-orange-400 mt-6">
          <div>Oops, produk tidak ditemukan </div>
        </div>
        <p className="font-goto text-teal-700 text-md">gunakan kata kunci lain</p>
        <Link to={"/"}>
          <div className="flex items-center justify-center bg-orange-400 text-teal-50 px-8 py-1 mt-8 text-[18px] rounded-md">Kembali</div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
