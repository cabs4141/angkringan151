import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/rrtm3.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icon mata
import { GoogleLogin } from "@react-oauth/google";
import { notification } from "antd";
import { useAuthStore } from "../../zustand/users-store";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk menampilkan atau menyembunyikan password
  const navigate = useNavigate();
  const { setToken, userDetails, fetchUserDetails } = useAuthStore();

  const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/users/register`, { username, email, password, phone, alamat });
      if (response.status !== 201) {
        console.log(response.status);
      } else if (response.status === 400) {
        console.log(response.status);
      }
      navigate("/auth");
      console.log(response.status);
    } catch (error) {
      console.error(error.message);
      alert("registrasi gagal");
    }
  };

  const toLogin = () => {
    navigate("/auth");
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      // Kirim token ke backend untuk verifikasi
      const res = await axios.post(`${apiUrl}/auth/google/callback`, {
        token: googleToken,
      });

      // Dapatkan token dari backend
      const { token } = res.data.data;
      setToken(token);
      if (token) {
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
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={logo} className="mx-auto mb-[-10%] " width={160} />
        <h1 className="flex items-center justify-center gap-2 mt-16 text-center text-xl font-bold font-opensauce leading-9 tracking-tight text-gray-900">Daftar di RRTM Store</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Email */}
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          {/* Password */}
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
                type={showPassword ? "text" : "password"} // Mengatur tipe input berdasarkan state
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)} // Mengubah state showPassword
              >
                {showPassword ? (
                  <div className="mr-2">
                    <FaEyeSlash size={20} color="gray" />
                  </div>
                ) : (
                  <div className="mr-2">
                    <FaEye size={20} color="gray" />
                  </div>
                )}
              </button>
            </div>
          </div>
          {/* Phone */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                No HP
              </label>
            </div>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Alamat */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="alamat" className="block text-sm font-medium leading-6 text-gray-900">
                Alamat
              </label>
            </div>
            <div className="mt-2">
              <input
                id="alamat"
                name="alamat"
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Daftar
            </button>
          </div>
        </form>

        <div className=" mt-6">
          <div className=" flex justify-center items-center w-full">
            <GoogleLogin
              text="Daftar degan google"
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
          Sudah memiliki akun?
          <button onClick={toLogin} className="font-semibold leading-6 text-gray-600 hover:text-gray-500 p-2">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
