import { Route } from "react-router-dom";
import MainLayout from "../layouts/main/layout";
import Homepage from "../pages/home/homepage";
import ContactUsPage from "../pages/contactUs/contact-us";
import AboutUsPage from "../pages/aboutUs/about-us";
import ProductsPage from "../pages/products/products";
import SingleProductPage from "../pages/singleProduct/singleProduct";
import CartPage from "../pages/cart/cart";
import OrdersPage from "../pages/order/order";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import LoginPage from "../pages/auth/login";
import SignupPage from "../pages/auth/signup";
import ForgetPage from "../pages/auth/forget";
import ProfilePage from "../pages/auth/profile";
import OtpPage from "../pages/auth/otp";
import ResetPage from "../pages/auth/reset";
import SizeChart from "../sections/size-chart/size-chart";
import CheckoutPage from "../pages/checkout/checkout";
import OrderTrackingPage from "../pages/order/order-tracking";
import OrderSuccessPage from "../pages/order/order-success-page";

const mainRoutes = [
  <Route path="/" element={<MainLayout />}>
    <Route path="/" element={<Homepage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="selectedItem/:id" element={<SingleProductPage />} />
    <Route path="size-chart" element={<SizeChart />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
    <Route path="orders" element={<OrdersPage />} />
    <Route path="order-track" element={<OrderTrackingPage />} />
    <Route path="order-success/:id" element={<OrderSuccessPage />} />

    {/* ---------- AUTH ROUTES ---------- */}
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/reset/:id/:value" element={<ResetPage />} />
    <Route path="/forget" element={<ForgetPage />} />
    <Route path="/otp/:id" element={<OtpPage />} />
    <Route path="/profile" element={<ProfilePage />} />

    {/* ---------- OTHER ROUTES ---------- */}
    <Route path="contact" element={<ContactUsPage />} />
    <Route path="about" element={<AboutUsPage />} />
    <Route path="privacy-policy" element={<PrivacyPolicy />} />
    <Route path="tac" element={<Terms />} />
  </Route>,
];

export default mainRoutes;
