import { useEffect } from "react";
import TopHeader from "../../../components/header/top-header";
import { pricingDetailsAsync } from "../../../features/orderSlice";
import CheckoutDetails from "../checkout-details";
import { useAppDispatch } from "../../../app/hooks";

const CheckoutView = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(pricingDetailsAsync());
  }, []);

  return (
    <>
      <TopHeader
        title="Checkout"
        subtitle="Checkout"
        backgroundClass="checkoutBanner"
      />
      <CheckoutDetails />
    </>
  );
};

export default CheckoutView;
