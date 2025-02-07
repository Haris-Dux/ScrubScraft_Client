import { Helmet } from "react-helmet-async";
import OrderSuccessView from "../../sections/orders/order-success-page";

const OrderSuccessPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Order Success - ScrubsCraft</title>
      </Helmet>

      <OrderSuccessView />
    </>
  );
};

export default OrderSuccessPage;
