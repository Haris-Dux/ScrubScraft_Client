// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import DetailsForm from "./details-form";

export interface RequestData {
  name: string | undefined;
  phone: string;
  address: string;
  items: any;
  userID: string | undefined;
  totalAmount: string;
  couponUsed?: {
    code: string;
    discount: number;
  };
}

const CheckoutDetails: React.FC = () => {
  // const navigate = useNavigate();

  const { cart, totalPrice } = useAppSelector((state) => state.actions);

  // useEffect(() => {
  //   if (cart?.length === 0) {
  //     navigate("/cart");
  //   }
  // }, [cart, navigate]);

  return (
    <>
      <section className="w-full bg-gray-50 py-14 sm:py-12 px-2 sm:px-8 lg:px-10 xl:px-0 min-h-[90vh]">
        <div className="max-w-5xl lg:max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 pb-5 gap-6">
              {/* Contact Info */}
              <DetailsForm />

              {/* Product List */}
              <div className="bg-white px-5 py-10 md:px-8 shadow-md border border-gray-200 rounded-lg">
                <div className="flow-root">
                  <ul className="-my-7 divide-y divide-gray-200">
                    {cart.map((product: any) => (
                      <li
                        key={product.id}
                        className="flex items-stretch justify-between space-x-5 py-7"
                      >
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            <img
                              className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover"
                              src={product?.images?.primary?.downloadURL}
                              alt={product?.name}
                            />
                          </div>
                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold">
                                {product?.name}
                              </p>
                              <p className="mt-1.5 text-sm font-medium text-gray-500">
                                {product.category === "Body Care"
                                  ? "Bodycare"
                                  : product.category}
                              </p>
                            </div>
                            <p className="mt-3 text-sm font-medium ">
                              x {product?.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-right text-sm font-bold text-gray-900">
                            {/* Rs. {product?.price * product.quantity} */}
                            {/* {product?.sale_price !== 0 ||
                            product?.sale_price > 0 ? (
                              <p className="">Rs. {product?.sale_price}</p>
                            ) : (
                              <p className="">Rs. {product?.price}</p>
                            )} */}
                            {(product.sale_price || product.price) *
                              product.quantity}
                          </p>

                          <p className="mt-3 text-sm font-normal text-gray-500">
                            {/* {product?.name_engraving && "+200"} */}
                            {product?.name_engraving &&
                              `+${200 * product.quantity}`}
                          </p>
                          <p className="mt-3 text-xs font-normal text-gray-500">
                            {product?.name_engraving && "(Name engraving)"}
                          </p>
                          <button
                            type="button"
                            className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                          >
                            <span className="sr-only">Remove</span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="mt-6 border-gray-200" />
                <ul className="mt-6 space-y-5">
                  <li className="flex items-center justify-between text-gray-600">
                    <p className="text-md font-medium">Subtotal</p>
                    <p className="text-md font-medium">Rs. {totalPrice}</p>
                  </li>
                  <li className="flex items-center justify-between text-gray-600">
                    <p className="text-md font-medium">Delivery Charges</p>
                    <p className="text-md font-medium">
                      Rs. {totalPrice < 5000 ? 280 : 0}
                    </p>
                  </li>
                  <li className="flex items-center justify-between border-t border-gray-500 pt-2 text-gray-900">
                    <p className="text-md font-medium ">Total</p>
                    <p className="text-md font-bold ">
                      Rs. {totalPrice < 5000 ? totalPrice + 280 : totalPrice}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutDetails;
