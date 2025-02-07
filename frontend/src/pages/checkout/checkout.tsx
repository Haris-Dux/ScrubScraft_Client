import { Helmet } from "react-helmet-async";
import CheckoutView from "../../sections/checkout/view/checkout-view";

const CheckoutPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout - ScrubsCraft</title>
      </Helmet>

      <CheckoutView />
    </>
  );
};

export default CheckoutPage;
