import { notification } from "antd";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useEditProduct, useProductDetail } from "../../zustand/products-store";
import { useAuthStore } from "../../zustand/users-store";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuthStore();
  const { fetchDetail, product } = useProductDetail();
  const { editProduct, loading, success, error, resetState } = useEditProduct();

  const [payload, setPayload] = useState({
    name: "",
    price: "",
    countInStock: "",
    alamat: "",
    description: "",
  });

  const decodedToken = jwtDecode(token);
  const isAdmin = decodedToken.isAdmin;

  useEffect(() => {
    fetchDetail(id);
    resetState(); // Reset state ketika komponen di-mount
  }, [id, fetchDetail, resetState]);

  useEffect(() => {
    if (product) {
      setPayload({
        name: product.name,
        price: product.price,
        countInStock: product.countInStock,
        alamat: product.alamat,
        description: product.description,
      });
    }
  }, [product]);

  useEffect(() => {
    if (success) {
      notification.success({ message: "Berhasil ", description: "Menu diperbarui" });

      navigate("/");
      resetState();
    } else if (error) {
      notification.error({ message: "Gagal ", description: "Terjadi kesalahan" });
    }
  }, [error, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const submitEdit = () => {
    editProduct(id, payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6 font-opensauce">
      {isAdmin ? (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Edit Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <img src={product.image || "/placeholder.png"} alt="Product" className="w-40 h-40 object-cover rounded-md shadow-md" />
            </div>
            <div className="flex flex-col space-y-2 text-sm">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nama Menu</label>
                <input name="name" onChange={handleChange} value={payload.name} type="text" placeholder="Nama Produk" className="w-full px-4 py-1 border rounded-md text-sm focus:outline-none focus:ring-0 focus:border-gray-600" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Harga</label>
                <input name="price" onChange={handleChange} value={payload.price} type="number" placeholder="Harga Produk" className="w-full px-4 py-1 border rounded-md text-sm focus:outline-none focus:ring-0 focus:border-gray-600" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Stock</label>
                <input
                  name="countInStock"
                  onChange={handleChange}
                  value={payload.countInStock}
                  type="number"
                  placeholder="Stock"
                  className="w-full px-4 py-1 border rounded-md text-sm focus:outline-none focus:ring-0 focus:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Alamat</label>
                <input name="alamat" onChange={handleChange} value={payload.alamat} type="text" placeholder="Alamat" className="w-full px-4 py-1 border rounded-md text-sm focus:outline-none focus:ring-0 focus:border-gray-600" />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Deskripsi Produk</label>
                <textarea name="description" value={payload.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Deskripsi Produk" rows="5" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button type="button" className="px-4 py-2 bg-red-500 text-white rounded text-sm" onClick={() => navigate("/")}>
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded text-sm" disabled={loading} onClick={submitEdit}>
              Simpan
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold text-red-500 mt-12 text-center">Maaf, Anda bukan admin.</div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default ProductEdit;
