import { create } from "zustand";
import axios from "axios";
import Loading from "../components/Loading";
const apiUrl = import.meta.env.VITE_API_URL_PRODUCTION;

const useGetCart = create((set, get) => ({
  cartItems: [],
  isLoading: false,
  cartItemCount: null,
  success: false,
  alert: false,
  getCartItems: async (userId) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/cart/cart-list/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ cartItems: response.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateCartItemQuantity: async (cartItemId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${apiUrl}/cart/edit-qty/${cartItemId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Perbarui state cartItems di store setelah sukses update
      set((state) => ({
        cartItems: state.cartItems.map((item) => (item._id === cartItemId ? { ...item, quantity: updatedData.quantity } : item)),
      }));
    } catch (error) {
      console.error("Failed to update cart item quantity:", error);
    }
  },
  deleteCartItems: async (cartItemIds) => {
    const token = localStorage.getItem("token");
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `${apiUrl}/cart/delete`,
        {
          ids: cartItemIds, // Mengirim array id ke backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ isLoading: false });
    } catch (error) {
      console.error("Error deleting cart items:", error.response ? error.response.data : error.message);
      set({ isLoading: false });
    }
  },
  addToCart: async (payload, userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${apiUrl}/cart/add-to-cart`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ success: true });

      // Setelah item berhasil ditambahkan, perbarui jumlah item di keranjang
      get().getItemCounts(userId);
    } catch (error) {
      console.error(error);
    }
  },

  getItemCounts: async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/cart/cart-list/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ cartItemCount: response.data.data.length });
    } catch (error) {
      console.error(error);
    }
  },
  resetState: () => {
    set({ success: false });
  },
  getAlert: () => {
    set({ alert: true });
  },
}));

export { useGetCart };
