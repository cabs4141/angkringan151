import { jwtDecode } from "jwt-decode"; // Pastikan ini tanpa curly braces
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetCart } from "../../zustand/cart-store";
import { useAuthStore } from "../../zustand/users-store";
import LoginButton from "../LoginButon";
import Modal from "../Modal";
import RegisterButton from "../RegisterButton";
import CategoryDropDown from "./CategoryDropDown";
import HeadBar from "./HeadBar";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SwapIcon from "./SwapIcon";
import userIcon from "../../assets/icon/flexy-man-avatar-2.png";

const MyNavabar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { userDetails, fetchUserDetails, isAuthorized, token, logout } = useAuthStore();
  const { getItemCounts, cartItemCount } = useGetCart(); // Langsung gunakan cartItemCount dari store

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuth = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true); // Menampilkan modal
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false); // Tutup modal
    navigate("/auth");
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false); // Tutup modal tanpa logout
  };

  const toCart = () => {
    navigate("/cart");
  };

  // useEffect(() => {
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const userId = decodedToken.userId;

  //     if (isAuthorized && userId) {
  //       fetchUserDetails(userId);
  //     }
  //   }
  //   console.log("re render atas");
  // }, [fetchUserDetails, isAuthorized, token]);

  const fetchUserDetailsMemoized = useCallback(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      fetchUserDetails(userId);
    }
  }, [fetchUserDetails, token]);

  useEffect(() => {
    fetchUserDetailsMemoized();
  }, [fetchUserDetailsMemoized, isAuthorized]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      getItemCounts(userId);
    }
  }, [getItemCounts, token]);

  return (
    <div className="sticky top-0 z-50">
      <div className="hidden xl:block lg:block">
        <HeadBar />
      </div>
      <div className="flex bg-white xl:justify-between justify-normal gap-4 items-center shadow-sm">
        <div className="flex flex-col xl:flex-row xl:gap-10 gap-4 items-center">
          <div>
            <Link to="/">
              <div className="xl:ml-6 bg-black xl:rounded-md">
                <h1 className="flex text-orange-500 xl:text-2xl text-[28px] font-bauhaus font-semibold xl:w-[180px] w-screen h-auto items-center justify-center px-2 py-1">angkringan151</h1>
              </div>
            </Link>
          </div>
          <div className="flex xl:gap-8 items-center py-3 px-4">
            <div className="hidden xl:block lg:block">
              <CategoryDropDown title="Kategori" />
            </div>
            <SearchBar />
            <div className="flex flex-row gap-4 items-center justify-between">
              <div className="flex items-center ml-4 xl:ml-0">
                <button className="flex" onClick={toCart}>
                  <div className="relative">
                    {cartItemCount > 0 ? <span className="absolute bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 mt-[-6px]">{cartItemCount}</span> : <span></span>}
                    <img className="hover:bg-gray-100 p-0 rounded-md w-[28px] xl:w-[28px]" src="https://img.icons8.com/?size=100&id=zhda2EVBCvHY&format=png&color=000000" alt="cartimg" />
                  </div>
                </button>
              </div>
              <div onClick={toggleMenu} className="xl:hidden xs:block">
                <SwapIcon />
              </div>

              <div className="hidden xl:block lg:block">
                <img src="https://img.icons8.com/?size=100&id=118834&format=png&color=E2DDDD" width={30} />
              </div>

              <div className="hidden xl:block lg:block">
                {isAuthorized && userDetails ? (
                  <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-2">
                      <img src={userIcon} alt="usericon" width={32} />
                      <div className="font-opensauce font-bold text-sm">{userDetails.username}</div>
                    </div>
                    <LoginButton title={"Sign Out"} handleAuth={handleLogout} />
                  </div>
                ) : (
                  <div className="xl:ml-6">
                    <LoginButton title={"Masuk"} handleAuth={handleAuth} />
                    <RegisterButton title={"Daftar"} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLogoutModalOpen && <Modal onConfirm={confirmLogout} onCancel={cancelLogout} />}
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} /> {/* Panggil onClose */}
    </div>
  );
};

export default MyNavabar;
