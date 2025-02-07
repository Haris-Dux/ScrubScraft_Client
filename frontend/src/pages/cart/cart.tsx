import { Helmet } from "react-helmet-async";
import CartView from "../../sections/cart/view/cart-view";

const CartPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart - ScrubsCraft</title>
      </Helmet>

      <CartView />
    </>
  );
};

export default CartPage;
