import { Routes, Route } from "react-router-dom";

// Routes
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Layouts
import PublicLayout from "../layouts/public/PublicLayout";
import CustomerLayout from "../layouts/customer/CustomerLayout";
import AuthLayout from "../layouts/auth/AuthLayout";

//Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Customer Pages
import HomePage from "../pages/customer/HomePage";
import RestaurantListPage from "../pages/customer/RestaurantListPage";
import RestaurantDetailsPage from "../pages/customer/RestaurantDetailsPage";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import MyOrdersPage from "../pages/customer/MyOrdersPage";
import OrderDetailsPage from "../pages/customer/OrderDetailsPage";
import ProfilePage from "../pages/customer/ProfilePage";

// Global Pages
import NotFoundPage from "../pages/NotFoundPage";

import { ROLES } from "../constants/roles";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Route*/}
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      {/* Customer Route   */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route element={<CustomerLayout />}>
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/orders' element={<MyOrdersPage />} />
            <Route path='/orders/:orderId' element={<OrderDetailsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
        </Route>
      </Route>

      {/* Public Route*/}
      <Route element={<PublicLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/restaurants' element={<RestaurantListPage />} />
        <Route
          path='/restaurants/:restaurantId'
          element={<RestaurantDetailsPage />}
        />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
