import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Layout from "./components/Layout";
import Events from "./pages/Events";
import CustomOrders from "./pages/CustomOrders";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("admin-token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="/events" element={<Events />} />
          <Route path="/custom-orders" element={<CustomOrders />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}