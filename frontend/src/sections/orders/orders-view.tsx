import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getallOrderAsync, updateOrderAsync } from "../../features/orderSlice";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/custom-dialog/delete-modal";
import LoadingScreen from "../../components/loading-screen/loading-screen";

export interface data {
  id: string | undefined;
  orderProgress: string;
}

interface Image {
  downloadURL: string;
  name: string;
  type: string;
}

interface Images {
  primary: Image;
  image2?: Image;
  image3?: Image;
  image4?: Image;
}

interface Product {
  id: string;
  name: string;
  category: string;
  images: Images;
  averageRating: number;
  sale_price: number | undefined;
  name_engraving: any;
  name_engraving_charges: any;
  cap: any;
  cap_charges: any;
  custom_size: any;
  custom_size_charges: any;
  price: number;
  stock: number;
  quantity: number;
}

const OrdersView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const userID = user?.user?.id;
  // console.log("userID", userID);

  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState<string>();

  const openModal = (id: string) => {
    setIsOpen(true);
    setOrderId(id);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const { allOrders, loading } = useAppSelector((state) => state.orders);
  console.log("allOrder", allOrders);

  const { updateLoading } = useAppSelector((state) => state.orders);
  const selectedOrder = allOrders.find((data) => data?.id === orderId);

  useEffect(() => {
    if (userID) {
      const id = userID;
      dispatch(getallOrderAsync(id));
    }
  }, [userID, dispatch]);

  // HANDLE DELETE
  const handleDelete = (id: string | undefined) => {
    const formData = {
      id,
      orderProgress: "Cancelled",
    };
    dispatch(updateOrderAsync(formData)).then((res) => {
      const id = userID;
      if (res.payload.message === "Order Updated") {
        dispatch(getallOrderAsync(id));
        closeModal();
      }
      window.scroll({
        behavior: "smooth",
        top: 0,
      });
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Delivered":
        return "text-green-500";
      case "Dispatched":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <section className="w-full pt-20 pb-14 sm:pt-24 sm:pb-12 px-5 sm:px-8 lg:px-10 xl:px-0 min-h-[100vh] bg-gray-50">
            <div className="max-w-5xl xl:max-w-6xl mx-auto">
              {allOrders?.length === 0 ? (
                <>
                  <span className="playfair text-3xl font-semibold uppercase">
                    No Orders
                  </span>
                </>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Order Details
                  </h2>
                  <div className="mt-3 text-sm">
                    Check the status of recent and old orders
                  </div>
                  {allOrders.map((data: any) => (
                    <div
                      key={data?.OrderID}
                      className="mt-8 flex flex-col overflow-hidden rounded-xl hover:shadow-blue-100 hover:shadow-md border border-primary/50 md:flex-row"
                    >
                      {/* ORDER DETAILS */}
                      <div className="w-full border-r border-gray-300 bg-[#f3f7ff] md:max-w-xs">
                        <div className="parent py-6 px-6 flex flex-col justify-between h-full gap-y-10">
                          {/* ORDER DETAILS */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2">
                            <div className="mb-4">
                              <div className="text-md sm:text-md font-semibold">
                                Order ID
                              </div>
                              <div className="text-md font-medium text-gray-700">
                                {data?.OrderID}
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="text-md sm:text-md font-semibold">
                                Date
                              </div>
                              <div className="text-md font-medium text-gray-700">
                                {new Date(data?.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="text-md sm:text-md font-semibold">
                                Total Amount
                              </div>
                              <div className="text-md font-medium text-gray-700">
                                Rs. {data?.totalAmount}
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="text-md sm:text-md font-semibold">
                                Order Status
                              </div>
                              <div
                                className={`text-md font-medium ${getStatusColor(
                                  data?.orderProgress
                                )}`}
                              >
                                {data?.orderProgress}
                              </div>
                            </div>
                          </div>

                          {/* ORDER CANCEL BUTTON */}
                          <div className="button">
                            {data?.orderProgress &&
                              data?.orderProgress === "Pending" && (
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => openModal(data?.id)}
                                    className="mt-5 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
                                  >
                                    <span>Cancel Order</span>
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>

                      {/* ORDER ITEMS */}
                      <div className="flex-1 bg-white">
                        <div className="py-6 px-3 sm:px-6">
                          <ul className="gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                            {data &&
                              data?.items?.map((product: Product) => (
                                <li
                                  key={product?.name}
                                  className="flex px-3 py-3 flex-col justify-between space-x-5 md:flex-row border rounded-xl bg-[#f3f7ff]"
                                >
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-20 w-20 rounded-lg bg-white border border-gray-200 object-contain"
                                        src={
                                          product?.images?.primary?.downloadURL
                                        }
                                        alt="order_img"
                                      />
                                    </div>

                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900 capitalize">
                                          {product?.name}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                                          {product?.category}
                                        </p>
                                      </div>

                                      <p className="mt-4 text-sm font-medium text-gray-500">
                                        x {product?.quantity}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">
                                      {(() => {
                                        let basePrice =
                                          product?.sale_price &&
                                          product?.sale_price !== 0
                                            ? product.sale_price
                                            : product.price;

                                        let extraCharges = 0;

                                        if (product?.name_engraving) {
                                          extraCharges +=
                                            product.name_engraving_charges || 0;
                                        }

                                        if (product?.cap) {
                                          extraCharges +=
                                            product.cap_charges || 0;
                                        }

                                        if (product?.custom_size) {
                                          extraCharges +=
                                            product.custom_size_charges || 0;
                                        }

                                        return (
                                          (basePrice + extraCharges) *
                                          product?.quantity
                                        );
                                      })()}
                                    </p>

                                    {/* <p className="mt-3 text-sm font-normal text-gray-500">
                                      {product?.name_engraving &&
                                        `+${200 * product.quantity}`}
                                    </p>
                                    <p className="mt-3 text-xs font-normal text-gray-500">
                                      {product?.name_engraving &&
                                        "(Name engraving)"}
                                    </p> */}
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>

          <DeleteModal
            isOpen={isOpen}
            title="Are You Sure?"
            desc="Do you really want to cancel this order?"
            onConfirm={() => handleDelete(selectedOrder?.id)}
            onCancel={closeModal}
            isLoading={updateLoading}
            buttonName="Cancel Order"
            buttonLoadingName="Cancelling..."
          />
        </>
      )}
    </>
  );
};

export default OrdersView;
