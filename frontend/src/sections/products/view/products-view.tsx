import { useAppSelector } from "../../../app/hooks";
import TopHeader from "../../../components/header/top-header";
import AllProducts from "../all-products";
import LatestProducts from "../LatestProducts";

const ProductsView = () => {
  const { latestProducts } = useAppSelector((state) => state.products);

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
