import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useRekomendasi } from "../../zustand/rekomender-store";
import { useAuthStore } from "../../zustand/users-store"; // ⬅️ ini
import { jwtDecode } from "jwt-decode";

const Rekomendasi = () => {
  const { products, fetchRekomendasi, loading } = useRekomendasi();
  const { token } = useAuthStore(); // ⬅️ pakai token dari authStore

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      fetchRekomendasi(userId, token); // ⬅️ kirim token
    }
  }, [token]);

  return (
    <div>
      {loading && <Loading />}
      <div className="flex flex-col items-center xl:items-start">
        <div className="font-opensauce pt-4 xs:font-bold text-gray-500">Rekomendasi untuk Anda 🔥</div>

        <div className="mt-2 xl:gap-4 gap-4 grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {products && products.length > 0
            ? products.map((product) => <ProductCard key={product._id} productId={product._id} namaProduk={product.name} harga={product.price} lokasi={product.alamat || "Tidak diketahui"} gambar={product.image} />)
            : !loading && <div>No Product</div>}
        </div>
      </div>
    </div>
  );
};

export default Rekomendasi;
