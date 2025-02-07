import { useEffect } from "react";
import ContactUs from "../contact-us";
import CTA from "../cta";
import HeroSection from "../hero-section";
import LatestProducts from "../LatestProducts";
import OurProducts from "../OurProducts";
import Trusted from "../trusted";
import WhyChooseUs from "../why-choose";
import WhyChooseV2 from "../why-choose-v2";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getAllProductsAsync,
  getLatestProductsAsync,
} from "../../../features/productSlice";
// import { useSearchParams } from "react-router-dom";

const HomeView = () => {
  const dispatch = useAppDispatch();

  // const [searchParams] = useSearchParams();
  // const page: number = parseInt(searchParams.get("page") || "1", 10);
  // const category: string = searchParams.get("category") || "All";

  const { filters } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProductsAsync(filters));
    dispatch(getLatestProductsAsync());
  }, []);

  const { products: allproducts } = useAppSelector((state) => state.products);
  const { latestProducts } = useAppSelector((state) => state.products);

  return (
    <>
      <HeroSection />
      <WhyChooseV2 />
      <OurProducts latestProducts={allproducts?.productData} />
      <Trusted />
      <CTA />
      <LatestProducts latestProducts={latestProducts} />
      <WhyChooseUs />
      <ContactUs />
    </>
  );
};

export default HomeView;
