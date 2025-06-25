import { create } from "zustand";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

const useCategory = create((set) => ({
  categories: [],
  getCategory: async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      set({ categories: response.data.data });
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export { useCategory };
