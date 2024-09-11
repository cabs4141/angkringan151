import { Route, Routes, useLocation } from "react-router-dom";
import MyFooter from "./components/MyFooter/MyFooter";
import MyNavabar from "./components/MyNavbar";
import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import ProductsDetail from "./pages/ProductsDetail";
import SearchProduct from "./pages/SearchProduct";

import CartPage from "./pages/CartPage";
import Register from "./pages/Register";

function UserPage() {
  const location = useLocation(); // Mengambil lokasi saat ini

  return (
    <>
      {/* Hanya render navbar jika bukan di halaman auth */}
      {!(location.pathname === "/auth" || location.pathname === "/register" || location.pathname === "/cart") && <MyNavabar />}

      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/products/search/:query" element={<SearchProduct />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>

      {/* Hanya render footer jika bukan di halaman auth */}
      {!(location.pathname === "/auth" || location.pathname === "/register" || location.pathname === "/cart") && <MyFooter />}
    </>
  );
}

export default UserPage;
