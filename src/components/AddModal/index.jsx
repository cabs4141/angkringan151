import { notification } from "antd";
import React, { useEffect, useState } from "react";
import addIcon from "../../assets/icon/3d-plastic-people-fast-food-set-of-burger-french-fries-and-drink.png";
import { useCategory } from "../../zustand/category-store"; // Impor store kategori
import { useAddProduct, useAllProducts } from "../../zustand/products-store";
import Loading from "../Loading";

export default function AddModal() {
  const { loading, error, success, addProduct, resetState } = useAddProduct();
  const { categories, getCategory } = useCategory();
  const { fetchProducts } = useAllProducts();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    countInStock: "",
    alamat: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Ambil file gambar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(formData, imageFile); // Kirim data produk beserta file gambar
  };

  useEffect(() => {
    getCategory();

    if (success) {
      fetchProducts();
      notification.success({ message: "Berhasil", description: "Menu baru ditambahkan" });
    } else if (error) {
      notification.error({ message: "Gagal", description: error });
    }
    resetState();
  }, [success, error, getCategory]);

  return (
    <>
      <button onClick={toggleModal} className="xl:font-semibold py-1 px-3 bg-gray-600 rounded-md text-white text-xs h-8 ">
        + Tambah Item
      </button>
      {/* <AddButton /> */}

      {isOpen && (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-[90%] max-w-md">
            <div className="flex gap-3 items-center px-3 py-3 justify-between">
              <div className="font-bold text-lg text-gray-500 ">Tambah Menu</div>
              <img src={addIcon} alt="addicon" width={84} />
            </div>
            {/* <hr className="bg-gray-200 h-0.5 mb-6 w-full" /> */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" placeholder="Nama Menu" type="text" value={formData.name} onChange={handleChange} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" required />

              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" required>
                <option disabled>Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <textarea name="description" placeholder="Deskripsi" value={formData.description} onChange={handleChange} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" rows="3" required />
              <input name="price" placeholder="Harga" type="number" value={formData.price} onChange={handleChange} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" required />
              <input name="countInStock" placeholder="Jumlah Tersedia" type="number" value={formData.countInStock} onChange={handleChange} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" required />
              <input name="alamat" placeholder="Lokasi" type="text" value={formData.address} onChange={handleChange} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" required />
              <label className="block">
                <span className="block text-sm font-medium text-gray-700">Upload Gambar</span>
                <input type="file" onChange={handleImageChange} className="block w-full text-sm mt-1" />
              </label>

              {loading && <Loading />}

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-1 bg-red-500 text-white rounded text-sm" onClick={toggleModal}>
                  Batal
                </button>
                <button type="submit" className="px-4 py-1 bg-gray-600 text-white rounded text-sm" disabled={loading}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
