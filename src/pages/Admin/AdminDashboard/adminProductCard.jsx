import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useAllProducts, useDeleteProduct } from "../../../zustand/products-store";

const AdminCard = ({ img, title, price, productId }) => {
  const { deleteProduct, loading, success, error, resetState } = useDeleteProduct();
  const [showModal, setShowModal] = useState(false);

  const { fetchProducts } = useAllProducts();
  const navigate = useNavigate();

  const handleDelete = () => {
    setShowModal(true); // Tampilkan modal saat tombol delete diklik
  };

  const confirmDelete = () => {
    deleteProduct(productId);
    setShowModal(false); // Tutup modal setelah konfirmasi penghapusan
  };

  const toEditPage = () => {
    navigate(`/edit-product/${productId}`);
  };

  // const setAlert = () => {
  //   if (success) {
  //   }
  // };

  useEffect(() => {
    if (success) {
      fetchProducts();
      notification.success({ message: "Berhasil", description: "Menu berhasil dihapus" });
      resetState();
    } else if (error) {
      notification.error({ message: "Gagal", description: error });
      resetState();
    }
  }, [success, error, fetchProducts, resetState]);

  return (
    <div className="border  xl:w-[180px] xl:h-[260px] w-[150px] h-[250px] flex  flex-col justify-normal p-2 bg-white shadow-md rounded-sm  cursor-pointer">
      <div className="h-[150px] w-full rounded-sm">
        <img className="object-cover h-full w-full rounded-sm " src={img} alt="cardimg" />
      </div>
      <div className="flex flex-col items-start text-center mt-3 px-2">
        <p className="font-medium xl:text-sm text-[11px] text-gray-500 mb-1">{title}</p>
        <p className=" text-xs font-semibold ">{price}</p>
      </div>
      <div className="flex flex-row items-center gap-2 mt-2 justify-center text-[10px] font-bold">
        <button onClick={toEditPage} className="bg-white border w-16 h-7 rounded-md flex flex-row items-center justify-center gap-1 hover:scale-105">
          <img src="https://img.icons8.com/?size=100&id=86376&format=png&color=BEB8B8" alt="edit" width={12} />
          <p>Edit</p>
        </button>
        <button onClick={handleDelete} className="bg-white border w-16 h-7 rounded-md flex flex-row items-center justify-center gap-1 hover:scale-105">
          <img src="https://img.icons8.com/?size=100&id=68064&format=png&color=F53030" alt="delete" width={12} />
          <p>Hapus</p>
        </button>
      </div>
      {showModal && (
        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-4 rounded-md shadow-lg xl:w-[400px] w-[360px] xl:text-md text-sm">
            <p>Apakah Anda yakin ingin menghapus menu ini?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={confirmDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default AdminCard;
