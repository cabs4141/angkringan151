import React, { useEffect, useRef, useState } from "react";
import { useProductMapping } from "../../zustand/products-store";
import formatRupiah from "../../libs/FormatRupiah";
import orderIcon from "../../assets/icon/order5.png";

const OrderModal = ({ isOpen, onClose, onConfirm, orderItems, subTotal, setModalData }) => {
  if (!isOpen) return null;
  const [alamat, setAlamat] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  // const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const { cartProduct, getProduct, resetCartProduct } = useProductMapping();
  const productIdsRef = useRef(orderItems?.cart?.map((item) => item.product)); // Gunakan useRef untuk menyimpan productIds

  useEffect(() => {
    if (isOpen) {
      resetCartProduct(); // Reset cartProduct ketika modal dibuka
      const productIds = productIdsRef.current;
      if (productIds && productIds.length > 0) {
        orderItems.cart.forEach((item) => {
          getProduct(item.product, item.quantity); // Kirim productId dan quantity
        });
      }
      console.log("ID Product:", productIds);
    }
  }, [isOpen]); // Hanya dijalankan saat modal dibuka

  useEffect(() => {
    setModalData({ alamat, phone });
  }, [alamat, phone]);

  const handleSubmit = () => {
    // Kirim data kembali ke parent (CartPage)
    onConfirm(); // Lanjutkan dengan konfirmasi order
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <div className="border-b-4 flex justify-between items-center">
          <div>
            <h2 className="text-md font-semibold mb-4 text-gray-500 font-opensauce">Konfirmasi Pemesanan</h2>
            {/* <p className="text-sm font-opensauce mb-4">Anda memesan:</p> */}

            {cartProduct.length > 0 ? (
              <ul className="mb-4">
                {cartProduct.map((item, index) => (
                  <li key={index} className="text-sm font-medium mb-1 text-green-500">
                    {item.quantity} x {item.name} {/* Tampilkan quantity dan nama produk */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm mb-4 ">Memuat data produk...</p>
            )}

            <p className="flex gap-2 mt-2 font-semibold text-md pb-2">
              Total:
              <div className="text-orange-500 font-bold font-opensauce">{formatRupiah(subTotal)}</div>
            </p>
          </div>
          <img src={orderIcon} alt="" width={80} style={{ marginRight: "22px" }} />
        </div>
        <form className="mt-4 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="alamat" className="text-sm font-medium mb-1">
              Alamat Pengiriman
            </label>
            <input
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              type="text"
              id="alamat"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          {/* <div className="flex flex-col">
            <label htmlFor="postalcode" className="text-sm font-medium mb-1">
              Kode Pos
            </label>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              id="postalcode"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Masukkan kode pos"
            />
          </div> */}

          {/* <div className="flex flex-col">
            <label htmlFor="kota" className="text-sm font-medium mb-1">
              Kota
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              id="kota"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Masukkan kota"
            />
          </div> */}

          <div className="flex flex-col">
            <label htmlFor="nohp" className="text-sm font-medium mb-1">
              No HP
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              id="nohp"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="No HP"
            />
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">
            Batal
          </button>
          <button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
