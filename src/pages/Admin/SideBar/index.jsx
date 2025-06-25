import React from "react";
import AdminDashboard from "../AdminDashboard";
import logo from "../../../assets/logo/rrtm.jpg";

const SideBar = () => {
  return (
    <div className="flex ">
      {/* Sidebar */}
      <div className="sticky top-0 w-60   bg-white flex flex-col items-center justify-center h-screen  xs:hidden xl:block  ">
        <div className="font-bauhaus text-orange-400 text-xl font-bold shadow-md   bg-white w-full  py-[12px] flex items-center justify-center">
          <img src={logo} alt="admin" width={54} />
        </div>
        <hr />

        <nav className=" bg-white w-full h-full shadow-xl font-semibold text-sm mt-10  ">
          <div className="flex items-center justify-start gap-2 ml-6">
            <img src="https://img.icons8.com/?size=100&id=6ocfyfPqD0qz&format=png&color=C4C0C0" alt="" width={20} />
            <a href="#" className="block text-gray-600   py-2 ">
              Dashboard
            </a>
          </div>
          <div className="flex items-center justify-start gap-2 ml-6">
            <img src="https://img.icons8.com/?size=100&id=6979&format=png&color=C4C0C0" alt="" width={20} />
            <a href="#" className="block text-gray-600   py-2 ">
              Produk
            </a>
          </div>
          <div className="flex items-center justify-start gap-2 ml-6">
            <img src="https://img.icons8.com/?size=100&id=85080&format=png&color=C4C0C0" alt="" width={20} />
            <a href="#" className="block text-gray-600   py-2 ">
              Pesanan
            </a>
          </div>
          <div className="flex items-center justify-start gap-2 ml-6">
            <img src="https://img.icons8.com/?size=100&id=59844&format=png&color=C4C0C0" alt="" width={20} />
            <a href="#" className="block text-gray-600   py-2 ">
              Transaksi
            </a>
          </div>
        </nav>
      </div>

      {/* Content */}
      <div className="transition-all duration-300 w-full overflow-y-auto">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default SideBar;
