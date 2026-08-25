import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RestaurantListPage from "../pages/RestaurantListPage";
import RestaurantDetailsPage from "../pages/RestaurantDetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";

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
        <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
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
