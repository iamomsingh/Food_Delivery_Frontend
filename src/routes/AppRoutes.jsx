import { Routes, Route } from "react-router-dom";

// Routes
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Layouts
import PublicLayout from "../layouts/public/PublicLayout";
import CustomerLayout from "../layouts/customer/CustomerLayout";
import AuthLayout from "../layouts/auth/AuthLayout";
import RestaurantLayout from "../layouts/restaurant/RestaurantLayout";
import DeliveryLayout from "../layouts/delivery/DeliveryLayout";
import AdminLayout from "../layouts/admin/AdminLayout";

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
import AddressPage from "../pages/customer/AddressPage";
import DeliveryPartnerApplicationPage from "../pages/delivery/DeliveryPartnerApplicationPage";
import DeliveryApplicationPage from "../pages/delivery/DeliveryApplicationPage";
import RestaurantOwnerApplicationPage from "../pages/restaurant/RestaurantOwnerApplicationPage";
import RestaurantOwnerApplicationStatusPage from "../pages/restaurant/RestaurantOwnerApplicationStatusPage";

// Restaurant Pages
import RestaurantDashboardPage from "../pages/restaurant/RestaurantDashboardPage";
import RestaurantOrdersPage from "../pages/restaurant/RestaurantOrdersPage";
import RestaurantOrderDetailsPage from "../pages/restaurant/RestaurantOrderDetailsPage";
import RestaurantMenuPage from "../pages/restaurant/RestaurantMenuPage";
import RestaurantManagementPage from "../pages/restaurant/RestaurantManagementPage";

// Admin Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminRestaurantsPage from "../pages/admin/AdminRestaurantsPage";
import AdminRestaurantDetailsPage from "../pages/admin/AdminRestaurantDetailsPage";
import AdminDeliveryPartnersPage from "../pages/admin/AdminDeliveryPartnersPage";
import AdminDeliveryPartnerDetailsPage from "../pages/admin/AdminDeliveryPartnerDetailsPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminUserDetailsPage from "../pages/admin/AdminUserDetailsPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "../pages/admin/AdminOrderDetailsPage";
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";
import RestaurantOwnerApplicationsPage from "../pages/admin/RestaurantOwnerApplicationsPage";
import RestaurantOwnerApplicationDetailsPage from "../pages/admin/RestaurantOwnerApplicationDetailsPage";

// Delivery-Partner Pages
import DeliveryDashboardPage from "../pages/delivery/DeliveryDashboardPage";
import DeliveryOrdersPage from "../pages/delivery/DeliveryOrderPage";
import DeliveryOrderDetailsPage from "../pages/delivery/DeliveryOrderDetailsPage";
import DeliveryProfilePage from "../pages/delivery/DeliveryProfilePage";

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

      {/* PROTECTED Route   */}
      <Route element={<ProtectedRoute />}>
        {/* Customer Route */}
        <Route element={<RoleRoute allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route element={<CustomerLayout />}>
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/orders' element={<MyOrdersPage />} />
            <Route path='/orders/:orderId' element={<OrderDetailsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/addresses' element={<AddressPage />} />
            <Route
              path='/delivery/apply'
              element={<DeliveryPartnerApplicationPage />}
            />
            <Route
              path='/delivery/application'
              element={<DeliveryApplicationPage />}
            />
            <Route
              path='/restaurant-owner/apply'
              element={<RestaurantOwnerApplicationPage />}
            />
            <Route
              path='/restaurant-owner/application'
              element={<RestaurantOwnerApplicationStatusPage />}
            />
          </Route>
        </Route>

        {/* Restaurant_Owner Route*/}
        <Route element={<RoleRoute allowedRoles={[ROLES.RESTAURANT]} />}>
          <Route element={<RestaurantLayout />}>
            <Route
              path='/restaurant/dashboard'
              element={<RestaurantDashboardPage />}
            />
            <Route
              path='/restaurant/orders'
              element={<RestaurantOrdersPage />}
            />
            <Route
              path='/restaurant/orders/:orderId'
              element={<RestaurantOrderDetailsPage />}
            />
            <Route path='/restaurant/menu' element={<RestaurantMenuPage />} />
            <Route
              path='/restaurant/management'
              element={<RestaurantManagementPage />}
            />
          </Route>
        </Route>

        {/* Admin Route   */}
        <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin/dashboard' element={<AdminDashboardPage />} />

            <Route
              path='/admin/restaurant-owners'
              element={<RestaurantOwnerApplicationsPage />}
            />

            <Route
              path='/admin/restaurant-owners/:applicationId'
              element={<RestaurantOwnerApplicationDetailsPage />}
            />

            <Route
              path='/admin/restaurants'
              element={<AdminRestaurantsPage />}
            />

            <Route
              path='/admin/restaurants/:restaurantId'
              element={<AdminRestaurantDetailsPage />}
            />

            <Route
              path='/admin/delivery-partners'
              element={<AdminDeliveryPartnersPage />}
            />

            <Route
              path='/admin/delivery-partners/:partnerId'
              element={<AdminDeliveryPartnerDetailsPage />}
            />

            <Route path='/admin/users' element={<AdminUsersPage />} />

            <Route
              path='/admin/users/:userId'
              element={<AdminUserDetailsPage />}
            />

            <Route path='/admin/orders' element={<AdminOrdersPage />} />

            <Route
              path='/admin/orders/:orderId'
              element={<AdminOrderDetailsPage />}
            />

            <Route path='/admin/analytics' element={<AdminAnalyticsPage />} />
          </Route>
        </Route>

        {/* Delivery Route*/}
        <Route element={<RoleRoute allowedRoles={[ROLES.DELIVERY]} />}>
          <Route element={<DeliveryLayout />}>
            <Route
              path='/delivery/dashboard'
              element={<DeliveryDashboardPage />}
            />

            <Route path='/delivery/orders' element={<DeliveryOrdersPage />} />

            <Route
              path='/delivery/orders/:orderId'
              element={<DeliveryOrderDetailsPage />}
            />

            <Route path='/delivery/profile' element={<DeliveryProfilePage />} />
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
