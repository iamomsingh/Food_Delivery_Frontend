import { Route, Routes } from "react-router";
import CustomerLayout from "./layouts/CustomerLayout";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path='/' element={<HomePage />} />

          <Route
            path='/restaurants/:restaurantId'
            element={<RestaurantDetailsPage />}
          />

          <Route path='/cart' element={<CartPage />} />

          <Route path='/orders' element={<OrdersPage />} />

          <Route path='/orders/:orderId' element={<OrderDetailsPage />} />

          <Route path='/profile' element={<ProfilePage />} />
        </Route>

        <Route path='/login' element={<LoginPage />} />

        <Route path='/register' element={<RegisterPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
