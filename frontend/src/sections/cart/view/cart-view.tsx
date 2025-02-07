import TopHeader from "../../../components/header/top-header";
import CartDetails from "../cart-details";

const CartView = () => {
  return (
    <>
      <TopHeader title="Cart" subtitle="CART" backgroundClass="cartBanner" />
      <CartDetails />
    </>
  );
};

export default CartView;
