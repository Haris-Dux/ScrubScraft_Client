import { Outlet } from "react-router-dom";
// routes
import Header from "./header";
import Footer from "./footerv2";

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
