import { useState } from "react";

export const fetchSearch = async (fetchAxios, query) => {
  if (!query) return alert("input tidak boleh kosong");
  try {
    //http://localhost:3000/api/v1/products/search?name=jahe
    const response = await fetchAxios(query);
    console.log(response.data.data);
  } catch (error) {
    console.error("Failed to fetch search API", error.message);
  }
};

export const fetchDetailProduct = async (fetchAxios, idProduct) => {
  if (!idProduct) return alert("id kosong");
  try {
    //http://localhost:3000/api/v1/products/search?name=jahe
    const response = await fetchAxios();
    console.log(response.data.data);
  } catch (error) {
    console.error("Failed to fetch search API", error.message);
  }
};
