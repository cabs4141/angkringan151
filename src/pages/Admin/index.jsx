import React, { useEffect } from "react";
import { useAuthStore } from "../../zustand/users-store";
import { jwtDecode } from "jwt-decode";
import SideBar from "./SideBar";

const DashBoard = () => {
  const { isAuthorized } = useAuthStore();
  const { setToken, logout, token } = useAuthStore();
  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);

      // Cek apakah token sudah kadaluarsa
      if (decodedToken.exp * 1000 < Date.now()) {
        logout(); // Jika token sudah kadaluarsa, lakukan logout
      } else {
        setToken(token); // Jika token valid, set isAuthorized menjadi true
      }
    } catch (error) {
      console.error("Invalid token:", error);
      logout(); // Jika token tidak valid, lakukan logout
    }
  }, [setToken, logout]);
  return (
    <div>
      {isAuthorized ? (
        <>
          <SideBar />
        </>
      ) : (
        <div className="min-h-screen">Login dulu boskuuuu</div>
      )}
    </div>
  );
};

export default DashBoard;
