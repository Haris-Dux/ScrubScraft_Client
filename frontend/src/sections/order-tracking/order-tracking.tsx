import { useEffect, useState } from "react";
import "../sections.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearTrackOrder, trackOrderAsync } from "../../features/orderSlice";
import OrdersDetails from "./order-details";

const OrderTrackingView = () => {
  const dispatch = useAppDispatch();
  const [OrderID, setOrderID] = useState("");

  const { trackOrder, orderTrackingLoading } = useAppSelector(
    (state) => state.orders
  );

  console.log("trackOrder", trackOrder);

  const ToDown = () => {
    window.scrollTo({
      top: 470,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(trackOrderAsync({ OrderID })).then((res: any) => {
      if (res.payload.order) {
        ToDown();
      }
    });
  };

  useEffect(() => {
    return () => {
      dispatch(clearTrackOrder());
    };
  }, [dispatch]);

  return (
    <>
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white min-h-[70vh] flex flex-col justify-center items-center relative px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mt-14 bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-2 text-center sm:text-start">
              Track your order
            </h1>
            <p className="text-sm mb-6 text-center sm:text-start">
              Enter your order number to track your package
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your order number"
                value={OrderID}
                onChange={(e) => setOrderID(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                required
              />
              <button
                type="submit"
                disabled={orderTrackingLoading}
                className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderTrackingLoading ? "Tracking..." : "Track Order"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {trackOrder && Object.keys(trackOrder).length > 0 && (
        <OrdersDetails trackOrder={trackOrder} />
      )}
    </>
  );
};

export default OrderTrackingView;
