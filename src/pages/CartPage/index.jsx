import { Alert, notification } from "antd";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/icon/3d-kit-shopping-cart.png";
import Loading from "../../components/Loading";
import formatRupiah from "../../libs/FormatRupiah";
import { useGetCart } from "../../zustand/cart-store";
import { useOrder } from "../../zustand/order-store";
import OrderModal from "./orderModal";
import UnauthorizedIcon from "./UnauthorizedIcon";
import DeliveryIcon from "./DeliveryIcon";
import axios from "axios";

const CartPage = () => {
  const { getCartItems, cartItems, updateCartItemQuantity, deleteCartItems, isLoading } = useGetCart();
  const { loading, resetState, success, addOrder } = useOrder((state) => ({
    loading: state.loading,
    resetState: state.resetState,
    success: state.success,
    addOrder: state.addOrder,
  }));

  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIds, setProductIds] = useState([]);

  //usestate payload
  const [alamat, setAlamat] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  // const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const token = localStorage.getItem("token");
  let user;
  if (token) {
    user = jwtDecode(token);
    user = user.userId;
  }
  const handleModalData = (data) => {
    // Update state dengan data dari modal
    setAlamat(data.alamat);
    // setPostalCode(data.postalCode);
    // setCity(data.city);
    setPhone(data.phone);
  };
  const payload = {
    user: user,
    cart: selectedItems
      .map((itemId) => {
        const cartItem = cartItems.find((item) => item._id === itemId);
        return cartItem && cartItem.product
          ? {
              user: cartItem.user,
              product: cartItem.product._id, // Ambil productId
              quantity: cartItem.quantity, // Ambil quantity
            }
          : null;
      })
      .filter((item) => item !== null), // Filter item yang null
    shippingAddress1: alamat,

    phone: phone,
  };

  const handleOrder = () => {
    // Ambil ID produk dari selectedItems
    const ids = selectedItems.map((itemId) => {
      const cartItem = cartItems.find((item) => item._id === itemId);
      return cartItem ? cartItem.product._id : null;
    });

    setProductIds(ids); // Set productIds sebelum membuka modal
    setIsModalOpen(true); // Buka modal ketika tombol "Pesan" diklik
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Tutup modal
  };

  const handleConfirmOrder = async () => {
    // Ambil ID produk dari selectedItems
    const selectedProducts = selectedItems
      .map((itemId) => {
        const cartItem = cartItems.find((item) => item._id === itemId);
        if (cartItem && cartItem.product) {
          return `*${cartItem.quantity} x ${cartItem.product.name}*`; // Format: quantity x product name (tebal)
        } else {
          return ""; // Atau Anda bisa memberikan pesan error
        }
      })
      .filter((item) => item !== ""); // Filter item yang kosong

    // addOrder(payload);
    // console.log(payload);
    const response = await axios.get(`https://angkringan-express-production.up.railway.app/api/v1/users/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userWa = response.data.data.username;

    // Format pesan sesuai dengan permintaan
    const orderMessage = `P Admin,\nSaya *${userWa}* ingin memesan:\n\n${selectedProducts.join("\n")}\n\nAlamat: *${alamat}*\nNo HP: *${phone}*\n\nTotal: *${formatRupiah(totalHarga)}*`;

    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappUrl = `whatsapp://send?phone=6285927748171&text=${encodedMessage}`;
    window.location.href = whatsappUrl;

    console.log("Order dikonfirmasi dengan produk ID:", payload);

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (success) {
      notification.success({ message: "Success", description: "Order berhasil dibuat" });
    }
    resetState();
  }, [success]);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      getCartItems(userId);
    } else {
      notification.warning({
        message: "Unauthorized",
        description: "Silakan login untuk pemesanan",
        type: "warning",
        // icon: <UnauthorizedIcon />,
      });
      navigate("/auth");
    }
  }, [token, getCartItems]);

  // Fungsi untuk menghandle pemilihan item
  const handleSelectItem = (cartItemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(cartItemId)) {
        return prevSelectedItems.filter((item) => item !== cartItemId);
      } else {
        return [...prevSelectedItems, cartItemId];
      }
    });
  };

  // Fungsi untuk menghitung total harga
  useEffect(() => {
    const total = selectedItems.reduce((acc, itemId) => {
      const item = cartItems.find((cartItem) => cartItem._id === itemId);
      if (item) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
    setTotalHarga(total);
  }, [selectedItems, cartItems]);

  const handleUpdateQuantity = (cartItemId, newQuantity) => {
    const itemToUpdate = cartItems.find((item) => item._id === cartItemId);

    if (itemToUpdate) {
      updateCartItemQuantity(cartItemId, {
        quantity: newQuantity,
        user: itemToUpdate.user, // Pastikan ini ada jika diperlukan
        product: itemToUpdate.product, // Pastikan ini ada jika diperlukan
      });
    } else {
      console.error("Cart item tidak ditemukan!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCartItems(selectedItems);
      // Re-fetch the cart items after deletion
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        await getCartItems(userId); // Make sure to wait for the re-fetch to complete
        setSelectedItems([]); // Reset selected items after deletion
      }
    } catch (error) {
      console.error("Error deleting cart items:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = cartItems.map((item) => item._id);
      setSelectedItems(allItemIds);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-row items-center justify-between font-opensauce text-md text-gray-500 font-medium px-8 border-b-2 h-[60px] bg-white">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="cursor-pointer p-1">
            <img src="https://img.icons8.com/?size=100&id=357&format=png&color=848080" alt="back" width={38} />
          </button>
          <h1 className="text-xl">Keranjang</h1>
        </div>
        {selectedItems.length > 0 ? (
          <div onClick={handleDelete} className="text-red-500 cursor-pointer active:scale-95 active:opacity-70">
            Hapus
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* {alert && <Alert message="Success Tips" type="success" showIcon />} */}
      {/* Make sure loading is correctly reflected here */}
      {loading && <Loading />} {/* Make sure loading is correctly reflected here */}
      {isLoading && <Loading />} {/* Make sure loading is correctly reflected here */}
      {cartItems.length > 0 ? (
        <Alert
          message="Pembayaran COD, Gratis ongkir khusus wilayah Kota Selong"
          type="warning"
          showIcon
          closable
          icon={<DeliveryIcon style={{ color: "orange", fontSize: "20px", marginRight: "10px" }} />} // Menambahkan margin pada ikon
          className="px-8 rounded-none text-xs font-opensauce"
        />
      ) : (
        <></>
      )}
      {selectedItems.length > 0 ? <div className="font-opensauce text-md ml-10 mt-4 text-gray-600"> {selectedItems.length} item terpilih </div> : <div></div>}
      <div className="mx-4 my-2 p-4 bg-white rounded-lg shadow-lg overflow-y-auto min-h-[480px]" style={{ maxHeight: "calc(100vh - 130px)" }}>
        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-3 pb-24">
            {cartItems.map((cartItem) => (
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md shadow-sm" key={cartItem._id}>
                <input type="checkbox" checked={selectedItems.includes(cartItem._id)} onChange={() => handleSelectItem(cartItem._id)} className="form-checkbox h-5 w-5 text-orange-400 focus:ring-0 rounded-md cursor-pointer " />
                <div className="w-[100px] h-[70px] overflow-hidden rounded">
                  <img src={cartItem.product.image} alt="cart image" className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col gap-2 font-opensauce">
                  <p className="text-sm font-normal">{cartItem.product.name}</p>
                  <p className="font-bold text-sm">{formatRupiah(cartItem.product.price)}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <button onClick={() => handleUpdateQuantity(cartItem._id, cartItem.quantity - 1)} className="bg-gray-200 p-1 px-3 rounded">
                      -
                    </button>
                    <p className="text-orange-500 font-opensauce ">{cartItem.quantity}</p>
                    <button onClick={() => handleUpdateQuantity(cartItem._id, cartItem.quantity + 1)} className="bg-gray-200 p-1 px-3 rounded">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 h-[500px] font-opensauce">
            <img src={cartIcon} alt="emptycart" width={120} />
            <h1 className="font-semibold text-md">Keranjang Belanja Kosong ...</h1>
          </div>
        )}
      </div>
      {/* Bagian fixed untuk tombol beli */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 px-8 pb-12 xl:pb-6 flex justify-between items-center border-t-2">
        <div className="flex gap-2 items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-400 focus:ring-0  rounded-md cursor-pointer " checked={selectAll} onChange={handleSelectAll} />
          <div>Semua</div>
        </div>
        <div className="flex flex-row gap-4 font-opensauce">
          <div className="flex flex-col">
            <div className="flex justify-end">Total</div>
            <div className="font-semibold">{formatRupiah(totalHarga)}</div>
          </div>
          <button onClick={handleOrder} className={`p-2 flex items-center justify-center text-white rounded-lg w-20 ${selectedItems.length > 0 ? "bg-orange-400" : "bg-gray-400 cursor-not-allowed"}`} disabled={selectedItems.length === 0}>
            <div className="flex gap-1 text-sm">
              <p>Pesan</p>
              {selectedItems.length > 0 ? <p>({selectedItems.length})</p> : <p></p>}
            </div>
          </button>
        </div>
        <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmOrder} orderItems={payload} subTotal={totalHarga} setModalData={handleModalData} />
      </div>
    </div>
  );
};

export default CartPage;
