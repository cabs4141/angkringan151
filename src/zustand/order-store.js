import { create } from "zustand";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

const useOrder = create((set, get) => ({
  orderDetails: [],
  loading: false,
  success: false,
  resetState: () => {
    set({ success: false });
  },
  addOrder: async (payload) => {
    try {
      set({ loading: true, success: false }); // Reset state before submitting
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.post(`${apiUrl}/orders`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
      }
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false });
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else {
        console.error("Request failed:", error.message);
      }
    }
  },
}));

export { useOrder };
