import TopHeader from "../../../components/header/top-header";
import { ProductPage } from "../product-details";

const SingleProductView = () => {
  return (
    <>
      <TopHeader
        title="Product Details"
        subtitle="shop"
        backgroundClass="singleProduct"
      />
      <ProductPage />
    </>
  );
};

export default SingleProductView;
