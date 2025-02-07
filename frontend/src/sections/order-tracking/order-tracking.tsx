import { useState } from "react";
import "../sections.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { trackOrderAsync } from "../../features/orderSlice";
import OrdersDetails from "./order-details";

const OrderTrackingView = () => {
  const dispatch = useAppDispatch();
  const [OrderID, setOrderID] = useState("");

  const { trackOrder, orderTrackingLoading } = useAppSelector(
    (state) => state.orders
  );

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

  return (
    <>
      {/* <section className="orderSectionbg relative">
        <div className="px-5 md:px-7 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <div className="pt-24 lg:pt-24 min-h-[70vh]">
            <div className="flex items-end lg:items-center justify-center lg:justify-start">
              <div className="mt-8 blur_bg border px-4 py-8 sm:p-4 rounded-2xl">
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 md:gap-10 md:p-6">
                  <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="mb-2 space-y-2">
                      <h1 className="text-3xl font-bold text-gray-50">
                        Track your order
                      </h1>
                      <p className="text-sm leading-none text-gray-50">
                        Enter your order number to track your package
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your order number"
                      value={OrderID}
                      onChange={(e) => setOrderID(e.target.value)}
                      className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-500 focus:border-gray-800 outline-none placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-xl"
                      required
                    />
                    <AuthButton
                      text="Track Order"
                      type="submit"
                      isLoading={orderTrackingLoading}
                      className="text-white bg-blue-500 hover:bg-blue-600"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="arrow absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button title="button" type="button" onClick={ToDown}>
            <TfiArrowCircleDown
              size={30}
              className="text-gray-50 font-semibold cursor-pointer"
            />
          </button>
        </div>
      </section> */}

      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white min-h-[70vh] flex flex-col justify-center items-center relative px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mt-14 bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-2 text-center sm:text-start">Track your order</h1>
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

      <OrdersDetails trackOrder={trackOrder} />
    </>
  );
};

export default OrderTrackingView;
