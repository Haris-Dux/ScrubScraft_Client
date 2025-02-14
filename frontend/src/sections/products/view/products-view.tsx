import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TopHeader from "../../../components/header/top-header";
import AllProducts from "../all-products";
import LatestProducts from "../LatestProducts";
import { getLatestProductsAsync } from "../../../features/productSlice";

const ProductsView = () => {
  const dispatch = useAppDispatch();
  const { latestProducts } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getLatestProductsAsync());
  }, []);

  return (
    <>
      <TopHeader
        title="Products"
        subtitle="SHOP"
        backgroundClass="allProducts"
      />

      <AllProducts />
      <LatestProducts latestProducts={latestProducts} />
    </>
  );
};

export default ProductsView;
