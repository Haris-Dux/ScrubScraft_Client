import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/notFound";
import Page404 from "../pages/404";
import Maintenance from "../pages/maintenance";
import LoadingScreen from "../components/loading-screen/loading-screen";
import ScrollToTop from "../helpers/scroll-to-top";
import mainRoutes from "./mainRoutes";
import WhatsappButton from "../components/buttons/whatsappButton";

function Routelist() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {...mainRoutes}
          <Route path="*" element={<NotFound />} />
          <Route path="404" element={<Page404 />} />
          <Route path="maintenance" element={<Maintenance />} />
        </Routes>
      </Suspense>

      <WhatsappButton />
    </BrowserRouter>
  );
}

export default Routelist;
