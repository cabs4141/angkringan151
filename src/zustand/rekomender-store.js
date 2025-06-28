import axios from "axios";
import { create } from "zustand";
const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

const useRekomendasi = create((set) => ({
  products: [],
  loading: false,
  fetchRekomendasi: async (userId, token) => {
    if (!token) return;

    try {
      set({ loading: true });
      const response = await axios.get(`${apiUrl}/recommend/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ products: response.data.recommendations, loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
}));

export { useRekomendasi };
