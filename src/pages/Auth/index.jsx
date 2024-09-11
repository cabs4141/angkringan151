import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../zustand/users-store";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Pastikan mengimpor dari 'jwt-decode'
import logo from "../../assets/logo/logo4-Photoroom.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { notification } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import AuthIcon from "./AuthIcon";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, userDetails, fetchUserDetails } = useAuthStore();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL_PRODUCTION;

  const [isFetchingUser, setIsFetchingUser] = useState(false);

  let isAdmin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users/login`, { email, password });
      const { token } = response.data.data;
      setToken(token);

      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        isAdmin = decodedToken.isAdmin;
        setIsFetchingUser(true); // Mulai memantau pengambilan userDetails
        await fetchUserDetails(userId);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      notification.error({ description: "Email atau password salah", message: "Autentikasi gagal" });
    }
  };

  useEffect(() => {
    if (!isFetchingUser) return;

    if (userDetails) {
      notification.open({
        message: (
          <div>
            <p>
              Selamat Datang, <strong>{userDetails.username}!</strong>
            </p>
          </div>
        ),
        description: "Nikmati pengalaman Anda di Angkringan151.",
        icon: <AuthIcon />,
        placement: "top",
      });

      navigate("/");
      setIsFetchingUser(false);
    }
  }, [userDetails, isFetchingUser, navigate]);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      // Kirim token ke backend untuk verifikasi
      const res = await axios.post(`${apiUrl}/auth/google/callback`, {
        token: googleToken,
      });

      // Dapatkan token dari backend
      const { token } = await res.data.data;
      await setToken(token);
      if (token) {
        // setIsFetchingUser(true);
        // Decode token dan ambil user data
        // const decodedToken = jwtDecode(token);
        // const userId = decodedToken.userId;
        // const isAdmin = decodedToken.isAdmin;
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed", error);
      notification.error({
        description: "Login dengan Google gagal",
        message: "Autentikasi gagal",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={logo} className="mx-auto mt-[-12%] xl:mt-[12%] xl:mb-[-10%] " width={130} />
        <h1 className="flex items-center justify-center gap-2 mt-14 text-center text-xl font-bold font-opensauce leading-9 tracking-tight text-gray-900">
          Masuk ke <p className=" text-orange-500 text-[24px] font-bauhaus">Angkringan151</p>
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={20} color="gray" /> : <FaEye size={20} color="gray" />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Masuk
            </button>
          </div>
        </form>

        <div className=" mt-6">
          <div className=" flex justify-center items-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="rectangular"
              theme="outline"
              size="medium"
              width={340}
            />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Belum punya akun?
          <button onClick={() => navigate("/register")} className="font-semibold leading-6 text-orange-600 hover:text-orange-500 p-2">
            Daftar disini
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
