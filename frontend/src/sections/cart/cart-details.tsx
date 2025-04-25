import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  getCartTotal,
  increaseQuantity,
  removeFromCart,
} from "../../features/ActionsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EmptyCart from "./empty-cart";
import CartTotal from "./cart-total";
// import CartProductCard from "./cart-products-card";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const { cart, totalPrice } = useAppSelector(
    (state: RootState) => state.actions
  );

  console.log("cart", cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  return (
    <>
      <section className="w-full py-10 sm:py-14 px-4 sm:px-8 lg:px-10 xl:px-0 bg-gray-50 min-h-[90vh]">
        <div className="max-w-5xl xl:max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="header">
            <div className="flex justify-end items-center">
              <div className="text-md font-semibold text-primary underline underline-offset-4">
                <Link to="/products">Return to Shop</Link>
              </div>
            </div>
          </div>

          <div className="">
            {cart && cart?.length > 0 ? (
              <div className=" py-6 grid place grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-8">
                <div className="rounded-xl col-span-2">
                  {cart?.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-4"
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          {/* Product Image */}
                          <div className="w-full sm:w-1/4 aspect-[3/4] rounded-lg overflow-hidden">
                            <img
                              src={
                                product.images.primary.downloadURL ||
                                "/placeholder.svg"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 w-full">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 capitalize">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 capitalize">
                                  {product.category}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">
                                  Rs.{" "}
                                  {(product.sale_price || product.price) *
                                    product.quantity}
                                </p>
                                {/* {product.sale_price && (
                                     <p className="text-sm text-gray-500 line-through">
                                       Rs. {product.price * product.quantity}
                                     </p>
                                   )} */}
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Fabric</p>
                                <p className="font-medium text-[14px] sm:text-[15px] capitalize">
                                  {product?.fabric_type}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Size</p>
                                {/* <p className="font-medium">{product?.sizes}</p> */}
                                <p className="font-medium text-[14px] sm:text-[15px]">
                                  {!product?.sizes && product?.custom_size
                                    ? "Custom size selected"
                                    : product?.sizes}
                                  <span className="text-gray-500 text-xs ml-1">
                                    {product?.custom_size &&
                                      `(Rs.${product?.custom_size_charges})`}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Color</p>
                                <p className="font-medium text-[14px] sm:text-[15px] capitalize">
                                  {product?.color}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Product Code
                                </p>
                                <p className="font-medium text-[14px] sm:text-[15px]">
                                  {product?.product_code}
                                </p>
                              </div>

                              {product?.trouser && (
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Trouser
                                  </p>
                                  <p className="font-medium text-[14px] sm:text-[15px] capitalize">
                                    {product?.trouser_details?.name}
                                  </p>
                                </div>
                              )}

                              {product?.cap && (
                                <div>
                                  <p className="text-sm text-gray-500">Cap</p>
                                  <p className="font-medium text-[14px] sm:text-[15px]">
                                    {product?.cap && `Added`}
                                    <span className="text-gray-500 text-xs ml-1">
                                      {product?.cap &&
                                        `(Rs.${product?.cap_charges})`}
                                    </span>
                                  </p>
                                </div>
                              )}

                              {product?.name_engraving && (
                                <div className="">
                                  <p className="text-sm text-gray-500">
                                    Name Engraving
                                  </p>
                                  <p className="font-medium">
                                    {product?.name_engraving.name} (
                                    {product?.name_engraving.position} side)
                                    <span className="text-gray-500 text-xs ml-1">
                                      {product?.name_engraving &&
                                        `(Rs.${product?.name_engraving_charges})`}
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() =>
                                    dispatch(decreaseQuantity(product.uniqueId))
                                  }
                                  className="p-2 hover:bg-gray-100"
                                  aria-label="Decrease quantity"
                                >
                                  <FiMinus />
                                </button>
                                <span className="px-4 py-2 font-medium">
                                  {product.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    dispatch(increaseQuantity(product.uniqueId))
                                  }
                                  className="p-2 hover:bg-gray-100"
                                  aria-label="Increase quantity"
                                >
                                  <FiPlus />
                                </button>
                              </div>
                              <button
                                onClick={() =>
                                  dispatch(removeFromCart(product.uniqueId))
                                }
                                className="text-red-600 hover:text-red-800 flex items-center"
                              >
                                <FiTrash2 className="mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <CartTotal totalPrice={totalPrice} />
              </div>
            ) : (
              <EmptyCart />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CartDetails;
