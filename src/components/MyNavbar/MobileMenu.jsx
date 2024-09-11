import React, { memo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../zustand/users-store";
import { jwtDecode } from "jwt-decode";
import LoginButton from "../LoginButon";
import RegisterButton from "../RegisterButton";
import Modal from "../Modal";
import userIcon from "../../assets/icon/flexy-man-avatar-2.png";

const MobileMenu = memo(({ isOpen, onClose }) => {
  const { userDetails, token, isAuthorized, logout } = useAuthStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleAuth = () => {
    navigate("/auth");
  };

  const handleReg = () => {
    navigate("/register");
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

  let isAdmin = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.isAdmin;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  console.log("user detail:", userDetails);

  return (
    <div className={`fixed inset-0 z-40 bg-white p-0 transform ${isOpen ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col gap-6 mt-6 font-opensauce font-bold text-xl items-center">
        <div className="flex flex-row  gap-4 mb-2">
          <button onClick={onClose}>
            <img src="https://img.icons8.com/?size=100&id=46&format=png&color=000000" alt="close" width={20} />
          </button>

          <div className="flex flex-row mr-44 text-[19px]">Menu Utama</div>
        </div>
        <div className="flex w-screen border-b-8 border-gray-100"></div>

        <div className="flex flex-col items-start justify-start  gap-4 mt-2 w-screen px-10">
          {isAuthorized ? (
            <>
              <div className="flex  items-start gap-4">
                {/* {userDetails.profilePicture ? <img className="rounded-full" src={userDetails.profilePicture} alt="usericon" width={64} /> : <img src={userIcon} alt="default icon" width={64} />} */}

                {userDetails ? (
                  <div className="flex-col items-center text-gray-500 font-opensauce  ">
                    <span className="flex items-center justify-start font-opensauce text-[15px] gap-2 text-black font-semibold ">
                      <img src="https://img.icons8.com/?size=100&id=15265&format=png&color=000000" alt="" width={20} />
                      {userDetails.username}{" "}
                    </span>
                    <span className="flex items-center justify-start font-opensauce text-[13px] gap-2  ">
                      <img src="https://img.icons8.com/?size=100&id=eBEo6FOQZ3v4&format=png&color=000000" alt="" width={20} />
                      {userDetails.email}{" "}
                    </span>
                    {userDetails.phone ? (
                      <span className="flex items-center justify-start font-opensauce text-[13px] gap-2  ">
                        <img src="https://img.icons8.com/?size=100&id=Iw5aeMT37fzK&format=png&color=000000" alt="" width={20} />
                        {userDetails.phone}{" "}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <div>Error...</div>
                )}
              </div>
              <div className="mt-6  w-full  flex items-center justify-center ">
                <button className="text-sm rounded-lg border-orange-500 border-1 px-12 py-2 text-orange-500" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-sm font-opensauce text-gray-500">Selamat datang di angkringan 151</p>
              <div className="flex flex-row gap-2">
                <LoginButton title={"Masuk"} handleAuth={handleAuth} />
                <RegisterButton title={"Daftar"} handleAuth={handleReg} />
              </div>
            </div>
          )}
        </div>

        <div className="flex w-screen items-center h-[10px] bg-slate-100"></div>
      </div>
      <ul className="space-y-4 font-opensauce font-bold ml-12 mt-6">
        <li className="flex gap-4 items-center" onClick={onClose}>
          <img src="https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=000000" alt="home" width={22} />
          <Link to="/">Home</Link>
        </li>
        {isAdmin ? (
          <li className="flex gap-4 items-center" onClick={onClose}>
            <img src="https://img.icons8.com/?size=100&id=10777&format=png&color=000000" alt="home" width={22} />
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
        ) : (
          <>
            <li className="flex gap-4 items-center" onClick={onClose}>
              <img src="https://img.icons8.com/?size=100&id=WcBUjJd6eKGE&format=png&color=000000" alt="home" width={22} />
              <Link to="/">Kategori</Link>
            </li>
            <li className="flex gap-4 items-center" onClick={() => (window.location.href = "whatsapp://send?phone=6285927748171&text=Halo%20saya%20ingin%20bertanya%20tentang%20produk%20Anda")}>
              <img src={"https://img.icons8.com/?size=100&id=16466&format=png&color=000000"} alt="home" width={22} />
              Hubungi Kami
            </li>
          </>
        )}
      </ul>
      {isLogoutModalOpen && <Modal onConfirm={confirmLogout} onCancel={cancelLogout} />}
    </div>
  );
});

export default MobileMenu;
