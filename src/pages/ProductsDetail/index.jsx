import { notification } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartButton from "../../components/CartButton";
import Loading from "../../components/Loading";
import CartIcon from "../../components/ProductCard/CartIcon";
import formatRupiah from "../../libs/FormatRupiah";
import { useGetCart } from "../../zustand/cart-store";

function ProductsDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useGetCart();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  console.log("ini dari prod detail");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL_PRODUCTION;
        const response = await axios.get(`${apiUrl}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  let userId;

  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
    } else {
      console.warn("Token tidak ditemukan");
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const payload = {
    userId: userId,
    productId: id,
    quantity: qty,
  };

  const handleAddCart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
      addToCart(payload, userId);
      notification.success({ message: `item ditambah ke keranjang`, icon: <CartIcon />, placement: "bottomRight", onClick: toCart });
    } else {
      navigate("/auth");
      notification.warning({
        message: "Unauthorized",
        description: "silakan login untuk pemesanan",
        type: "warning",
        // icon: <UnauthorizedIcon />,
      });
    }
  };

  const toCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return <Loading />;
  }
  if (error) return <div className="absolute inset-0 flex items-center justify-center min-h-screen">Network Error...</div>;

  return (
    <div className="product-detail">
      {product ? (
        <>
          <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container xl:px-5 py-16 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap items-center justify-center">
                <img alt="ecommerce" className=" object-contain object-center rounded-sm  border-gray-200 shadow-lg" src={product.image} width={200} />
                <div className="lg:max-w-xl w-full lg:pl-14 lg:py-6 mt-6 lg:mt-[-26px] font-opensauce">
                  <div className="flex flex-row items-center justify-between pb-2  ">
                    {/* <h2 className="text-lg   text-gray-500 tracking-widest">{product.category.name}</h2> */}
                    {/* <div className="flex gap-4 font-goto text-gray-500">
                      <img src={brand} alt="" width={24} />
                      {product.brand}
                    </div> */}
                    <h1 className=" text-xl font-opensauce text-gray-900  font-bold ">{product.name}</h1>
                    <div className="flex items-center gap-2 text-sm ">
                      <img src={"https://img.icons8.com/?size=100&id=13800&format=png&color=000000"} alt="cardimg" className="w-4 items-center" />
                      <p>{product.alamat}</p>
                    </div>
                  </div>

                  <div className="flex mb-2 text-sm ">
                    <span className="flex flex-col">
                      <span className="text-gray-600 items-center">
                        Tersedia: <span className=" font-bold">{product.countInStock}</span>
                        <span className="ml-2 font-medium">porsi</span>
                      </span>
                    </span>
                  </div>
                  <p className="font-opensauce border-b-3 pb-2"> {product.description}</p>
                  <div className="flex justify-between">
                    <div className="title-font font-semibold xl:text-2xl text-lg text-orange-400  my-4">{formatRupiah(product.price)}</div>
                    <div className="flex w-[140px] items-center justify-center xl:justify-end">
                      {/* <BuyNowButton /> */}
                      <CartButton onClick={handleAddCart} img={"https://img.icons8.com/?size=100&id=15893&format=png&color=FFFFFF"} title={"+ Keranjang"} />
                    </div>
                  </div>

                  {/* <div className="flex mt-6 items-center border-b-2 border-gray-200 mb-5"></div> */}
                  {/* <div className="flex xl:flex-row flex-col items-center justify-between"></div> */}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>Produk tidak ditemukan</div>
      )}
    </div>
  );
}

export default ProductsDetail;
