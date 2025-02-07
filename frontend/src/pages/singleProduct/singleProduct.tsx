import { Helmet } from "react-helmet-async";
import SingleProductView from "../../sections/single-product/view/single-product-view";

const SingleProductPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> ScrubsCraft</title>
      </Helmet>

      <SingleProductView />
    </>
  );
};

export default SingleProductPage;
