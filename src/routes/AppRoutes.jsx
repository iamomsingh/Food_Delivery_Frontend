import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/customer/CustomerLayout";
import AuthLayout from "../layouts/auth/AuthLayout";

import HomePage from "../pages/customer/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import RestaurantListPage from "../pages/customer/RestaurantListPage";
import RestaurantDetailsPage from "../pages/customer/RestaurantDetailsPage";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import MyOrdersPage from "../pages/customer/MyOrdersPage";
import OrderDetailsPage from "../pages/customer/OrderDetailsPage";
import ProfilePage from "../pages/customer/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/restaurants' element={<RestaurantListPage />} />
        <Route
          path='/restaurants/:restaurantId'
          element={<RestaurantDetailsPage />}
        />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders' element={<MyOrdersPage />} />
        <Route path='/orders/:orderId' element={<OrderDetailsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
