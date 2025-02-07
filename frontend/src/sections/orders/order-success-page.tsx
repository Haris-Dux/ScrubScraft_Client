import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useAppSelector } from "../../app/hooks";

const OrderSuccessView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [windowDimesion, setDimesion] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const user = useAppSelector((state) => state.auth.user);
  const userID = user?.user?.id;

  const detectSize = () => {
    setDimesion({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimesion]);

  const handleMoveToPage = (route: any) => {
    navigate(`/${route}`);

    if (route === "products") {
      window.scrollTo({
        top: 480,
        behavior: "instant",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Confetti
          width={windowDimesion.width}
          height={windowDimesion.height}
          tweenDuration={1000}
          recycle={false}
        />
      </div>

      <section className={`pt-10 px-4 xl:px-0 bg-[#F5F5F5] overflow-x-hidden`}>
        <div className="max-w-5xl mx-auto min-h-[95vh] flex justify-center items-center">
          <div className="py-6">
            <div className="flex justify-center flex-col items-center">
              <img
                src="https://cdn.shopify.com/s/files/1/0852/5099/8550/files/check-mark.png?v=1716905409"
                alt="order success logo"
                className="w-20"
              />
              <h2 className="mt-3 text-3xl text-center font-semibold">
                Your Order is Confirmed!
              </h2>
              <p className="mt-5 text-lg max-w-lg text-center font-normal">
                Thank you for your purchase! Your order has been successfully
                placed and is being processed.
              </p>
              {id && (
                <p className="mt-5 text-lg max-w-lg text-center font-normal">
                  Order ID: <span className="antialiased font-bold">{id}</span>
                </p>
              )}

              <div className="buttons flex flex-col sm:flex-row  justify-center items-center mt-6">
                {userID && (
                  <button
                    type="button"
                    onClick={() => handleMoveToPage("orders")}
                    className="uppercase my-2 mx-2 w-52 sm:w-56 py-2.5 border border-primary bg-primary text-white"
                  >
                    View Order
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleMoveToPage("products")}
                  className="uppercase my-2 mx-2 w-52 sm:w-56 py-2.5 border border-gray-600"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccessView;
