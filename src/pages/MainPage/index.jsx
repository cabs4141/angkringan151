import { Alert, notification } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import TitlePage from "../../components/TitlePage";
import { useGetCart } from "../../zustand/cart-store";
import { useAuthStore } from "../../zustand/users-store";
import Banner from "./Banner";
import ProductUnggulan from "./ProductUnggulan";

const MainPage = () => {
  const { setToken, logout, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        } else {
          setToken(token);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      logout();
    }
  }, [setToken, logout, token, notification]);

  return (
    <>
      <div>
        <Alert
          type="info"
          className="px-4"
          banner
          message={
            <Marquee pauseOnHover gradient={false}>
              Lokasi di Jl. TGH. Zainuddin Abdul Majid No.151.
            </Marquee>
          }
        />
        <div className="flex items-center justify-center mt-6">
          <Banner />
        </div>
        <div className="flex flex-col xl:px-[40px] xl:items-start items-center xl:ml-3">
          <div className="hidden xl:block lg:block">
            <TitlePage title="Kategori pilihan" />
          </div>
          <div className="border-b border-gray-300"></div>
          <ProductUnggulan />
        </div>
      </div>
    </>
  );
};

export default MainPage;
