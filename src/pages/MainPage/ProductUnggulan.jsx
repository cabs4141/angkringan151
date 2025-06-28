import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAllProducts, useFeaturedProducts } from "../../zustand/products-store";

const ProductUnggulan = () => {
  const { products, fetchProducts, loading } = useAllProducts();
  // const { categories, getCategory } = useCategory();

  useEffect(() => {
    fetchProducts();
    // getCategory();
  }, [fetchProducts]); // Tambahkan fungsi sebagai dependensi

  return (
    <div>
      {loading && <Loading />}
      <div className="flex flex-col items-center xl:items-start">
        <div className="font-opensauce pt-4 xs:font-bold text-gray-500">
          {/* {categories
            .filter((data) => data.name === "Makanan")
            .map((filteredData) => (
              <div key={filteredData._id || filteredData.id}>{filteredData.name}</div>
            ))} */}
          Semua Item
        </div>

        <div className="mt-2 xl:gap-4 gap-4 grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {products ? (
            products.map((product) => <ProductCard key={product._id || product.id} productId={product._id || product.id} namaProduk={product.name} harga={product.price} lokasi={product.alamat} gambar={product.image} />)
          ) : (
            <div>No Product</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductUnggulan;
