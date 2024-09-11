import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./AppContainer";
import Admin from "./pages/Admin";
import { useAuthStore } from "./zustand/users-store";
import { jwtDecode } from "jwt-decode";
import ProductEdit from "./pages/ProductEdit";
import { useMemo } from "react";

function App() {
  const { token, isAuthorized } = useAuthStore();
  const decodedToken = useMemo(() => {
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error("Error dari App.jsx", error);
        return null;
      }
    }
    return null;
  }, [token]);

  const isAdmin = decodedToken?.isAdmin;

  return (
    <Router>
      <Routes>
        {isAdmin && isAuthorized ? (
          <>
            <Route path="/" element={<Admin />} />
            <Route path="/edit-product/:id" element={<ProductEdit />} />
          </>
        ) : (
          <Route path="*" element={<UserPage />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
