import React, { useEffect } from "react";
import AdminCard from "./adminProductCard";
import { useAllProducts, useDeleteProduct } from "../../../zustand/products-store";
import formatRupiah from "../../../libs/FormatRupiah";
import AddModal from "../../../components/AddModal";

const Content = () => {
  const { products, fetchProducts } = useAllProducts();
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="min-h-screen px-4 pb-6 sm:px-6 lg:px-8 bg-gray-100 font-opensauce mt-14 xl:mt-12  ">
        <div className="flex flex-row p-4 items-center justify-between">
          <h1 className="font-bold text-gray-500">Menu List</h1>
          <AddModal />
        </div>
        <div className=" flex flex-row items-center justify-between bg-white py-4 px-8 ">
          <div className="flex justify-end">
            <input
              placeholder="Cari produk"
              type="text"
              className=" rounded-md ring-gray-500 w-[250px] h-[30px] text-gray-600 placeholder:text-gray-400 placeholder:text-xs  placeholder:font-light border-gray-300 border    font-opensauce text-sm focus:outline-none focus:border-none focus:ring-gray-400"
            />
            <div className="absolute z-0 mr-2 mt-1.5 ">
              <button>
                <img className=" text-gray-500" src="https://img.icons8.com/?size=100&id=59878&format=png&color=0000004D" alt="search icon" width={18} />
              </button>
            </div>
          </div>
          {/* <div>filter</div> */}
        </div>
        <hr className="border-t-2 border-gray-100 " />
        {/* Your content */}
        <div className="bg-white h-auto grid xl:grid-cols-5 grid-cols-2  xl:gap-4 gap-2 p-4 justify-items-center ">
          {products.map((product) => {
            return <AdminCard productId={product.id} key={product.id} img={product.image} price={formatRupiah(product.price)} title={product.name} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Content;
