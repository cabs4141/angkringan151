import ProductCard from "../../components/ProductCard/ProductCard";
import TitlePage from "../../components/TitlePage";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import { useSearchProduct } from "../../zustand/products-store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const SearchProduct = () => {
  const { query } = useParams();
  const { loading, products, fetchProducts } = useSearchProduct();

  useEffect(() => {
    fetchProducts(query);
  }, [query, fetchProducts]);
  return (
    <div>
      {loading && <Loading />}
      {/* {notFound && <NotFound />} */}

      <div className="xl:min-h-screen min-h-[500px] flex flex-col xl:px-[40px] px-0 items-center justify-center xl:ml-3">
        <div className="flex flex-col items-center xl:items-start xl:mt-[-12%] ">
          <TitlePage title={`Hasil Pencarian untuk "${query}"`} />
          {products.length > 0 ? (
            <div className=" mt-2 xl:gap-4 gap-6 grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2">
              {products.map((data) => (
                <ProductCard key={data.id} gambar={data.image} harga={data.price} lokasi={data.alamat} namaProduk={data.name} productId={data.id} />
              ))}
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
