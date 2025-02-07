import { Helmet } from "react-helmet-async";
import ProductsView from "../../sections/products/view/products-view";

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products - ScrubsCraft</title>
      </Helmet>

      <ProductsView />
    </>
  );
};

export default ProductsPage;
