import { Helmet } from "react-helmet-async";
import OrderTrackingView from "../../sections/order-tracking/order-tracking";

const OrderTrackingPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Order Tracking - ScrubsCraft</title>
      </Helmet>

      <OrderTrackingView />
    </>
  );
};

export default OrderTrackingPage;
