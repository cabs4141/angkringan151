import axios from "axios";
import { create } from "zustand";
const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

const useSearchProduct = create((set) => ({
  searchTerm: "",
  products: [],
  loading: false,
  notFound: false,

  setQuery: (newQuery) => set({ searchTerm: newQuery }),

  fetchProducts: async (searchQuery) => {
    set({ loading: true, notFound: false });

    try {
      const response = await axios.get(`${apiUrl}/products/search`, {
        params: { name: searchQuery },
      });

      set({ products: response.data.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch products", error.message);
      set({ products: [], loading: false, notFound: true });
    }
  },
}));

const useFeaturedProducts = create((set) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    try {
      set({ loading: true });
      const response = await axios(`${apiUrl}/products/get/featured/limit=10`);
      set({ products: response.data.data, loading: false });
    } catch (error) {
      console.log("ini error dari store", error);
      set({ loading: false });
    }
  },
}));

const useAllProducts = create((set) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    try {
      set({ loading: true });
      const response = await axios(`${apiUrl}/products`);
      const productsData = response.data.data;
      set({ products: productsData, loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
}));

const useAddProduct = create((set) => ({
  loading: false,
  error: null,
  success: false,
  addProduct: async (productData, imageFile) => {
    set({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem("token");

      // Buat FormData dan tambahkan data produk serta file gambar
      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }
      formData.append("image", imageFile); // Tambahkan gambar ke form data

      const response = await axios.post(`${apiUrl}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Pastikan tipe konten adalah multipart/form-data
        },
      });

      set({ loading: false, success: true, error: null });
      console.log(response.data);
    } catch (error) {
      set({ loading: false, error: error.message, success: false });
      console.log(error);
      console.error(error);
    }
  },
  resetState: () => {
    set({ success: false, error: null, loading: false });
  },
}));

const useDeleteProduct = create((set) => ({
  loading: false,
  error: null,
  success: false,
  deleteProduct: async (productId) => {
    try {
      set({ loading: true, error: null, success: false });
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${apiUrl}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ loading: false, success: true, error: false });
    } catch (error) {
      console.error(error);
      set({ error: error, loading: false, success: false });
    }
  },
  resetState: () => {
    set({ success: false, error: null, loading: false });
  },
}));

const useEditProduct = create((set) => ({
  loading: false,
  error: null,
  success: false,
  editProduct: async (productId, payload) => {
    try {
      set({ loading: true, success: false });
      const token = localStorage.getItem("token");
      const response = await axios.put(`${apiUrl}/products/${productId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ loading: false, error: false, success: true });
      console.log(response);
    } catch (error) {
      set({ loading: false, error: error, success: false });
      console.error(error);
    }
  },
  resetState: () => {
    set({ loading: false, success: false, error: null }); // Mereset state kembali ke nilai awalnya
  },
}));

const useProductDetail = create((set) => ({
  product: [],
  loading: false,
  error: null,
  success: false,
  fetchDetail: async (productId) => {
    try {
      const response = await axios.get(`${apiUrl}/products/${productId}`);
      set({ product: response.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

const useProductMapping = create((set) => ({
  cartProduct: [],
  loading: false,
  success: false,

  // Fungsi biasa untuk mengambil produk dan quantity
  getProduct: async (productId, quantity) => {
    try {
      if (!productId) {
        return console.log("No product ID provided");
      }
      const response = await axios.get(`${apiUrl}/products/${productId}`);
      set((state) => ({
        cartProduct: [...state.cartProduct, { ...response.data, quantity }], // Tambahkan produk dengan quantity ke dalam array cartProduct
      }));
      console.log("Product fetched and stored:", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },

  resetCartProduct: () => set({ cartProduct: [] }), // Tambahkan fungsi untuk mereset cartProduct
}));

export { useAddProduct, useAllProducts, useDeleteProduct, useEditProduct, useFeaturedProducts, useProductDetail, useProductMapping, useSearchProduct };
