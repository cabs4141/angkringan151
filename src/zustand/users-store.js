import axios from "axios";
import { create } from "zustand";
const apiUrl = import.meta.env.VITE_API_URL_LOCAL; // Pastikan menggunakan VITE_API_URL

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  isAuthorized: !!localStorage.getItem("token"),
  userDetails: null,

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      set({ token, isAuthorized: true });
    }
  },

  fetchUserDetails: async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(`${apiUrl}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ userDetails: response.data.data });
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    set({ token: null, isAuthorized: false, userDetails: null });
  },

  register: async (payload) => {
    try {
      const resposne = await axios.post(`${apiUrl}/users`);
    } catch (error) {
      console.error(error);
    }
  },
}));

export { useAuthStore };
