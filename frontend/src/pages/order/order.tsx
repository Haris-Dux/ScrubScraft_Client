import { Helmet } from "react-helmet-async";
import OrdersView from "../../sections/orders/orders-view";

const OrdersPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders - ScrubsCraft</title>
      </Helmet>

      <OrdersView />
    </>
  );
};

export default OrdersPage;
