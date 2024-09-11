import { notification } from "antd";
import { jwtDecode } from "jwt-decode";
import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import formatRupiah from "../../libs/FormatRupiah";
import { useGetCart } from "../../zustand/cart-store";
import CartButton from "../CartButton";
import CartIcon from "./CartIcon";

const ProductCard = memo(({ lokasi, harga, namaProduk, gambar, productId }) => {
  const { addToCart, success } = useGetCart();
  const [qty, setQty] = useState(1);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let userId = null;

  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } else {
      console.warn("Token tidak ditemukan");
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const payload = {
    userId: userId,
    productId: productId,
    quantity: qty,
  };

  const toCart = () => {
    navigate("/cart");
  };

  const handleAddToCart = () => {
    if (userId) {
      addToCart(payload, userId);

      notification.success({ message: `item ditambah ke keranjang`, icon: <CartIcon />, placement: "bottomRight", onClick: toCart, duration: 1 });
      console.log("re render function");
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

  console.log("komponen product card di render");

  return (
    <div className="flex flex-col shadow-md xl:w-[220px] xl:h-auto w-[170px] h-[280px] rounded-xs xl:overflow-hidden xl:hover:scale-105 xl:transition-transform cursor-pointer justify-normal">
      <Link to={`/products/${productId}`}>
        <div>
          <div>
            <img src={gambar} alt="" className="object-cover w-full xl:h-[200px] h-[150px]" />
          </div>
          <div className="px-2 pt-2">
            <p className="font-opensauce text-xs">{namaProduk}</p>
            <p className="mt-2 font-opensauce font-bold text-sm">{formatRupiah(harga)}</p>
            <div className="flex items-center gap-1 mt-2">
              <img src="https://img.icons8.com/?size=100&id=6OOnASO9fxuG&format=png&color=000000" alt="cardimg" className="w-3" />
              <p className="font-opensauce text-gray-800 text-[11px]">{lokasi}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-2">
        <div onClick={handleAddToCart}>
          <CartButton title={"Tambah Keranjang"} img={"https://img.icons8.com/?size=100&id=15893&format=png&color=FFFFFF"} />
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
