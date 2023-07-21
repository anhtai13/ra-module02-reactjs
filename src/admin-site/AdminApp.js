import "./AdminApp.css";

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../customer-site/store";

import AdminLayout from "./layouts/AdminLayout";

import AdminNotFoundPage from "./pages/errors/AdminNotFoundPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import UserList from "../admin-site/pages/users/UserList";
import ProductList from "./pages/products/ProductList";
import OrderList from "./pages/orders/OrderList";
import AdminAdd from "./pages/products/AdminAdd";
import AdminEdit from "./pages/products/AdminEdit";

function AdminApp() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/" element={<AdminLayout />}>
          <Route path="/customer" element={<UserList />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/order" element={<OrderList />} />
          <Route path="/product/add" element={<AdminAdd />} />
          <Route path="/product/edit/:id" element={<AdminEdit />} />
          <Route index element={<AdminHomePage />} />
          <Route path="*" element={<AdminNotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default AdminApp;
