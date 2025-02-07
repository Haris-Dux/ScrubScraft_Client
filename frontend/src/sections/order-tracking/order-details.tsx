import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateOrderAsync } from "../../features/orderSlice";
import DeleteModal from "../../components/custom-dialog/delete-modal";

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
  uniqueId: string;
  images: Images;
  averageRating: number;
  sale_price: number | undefined;
  name_engraving: any;
  price: number;
  stock: number;
  quantity: number;
}

const OrdersDetails = ({ trackOrder }: { trackOrder: any }) => {
  const dispatch = useAppDispatch();

  let data = trackOrder.order;

  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState<string>();

  const openModal = (id: string) => {
    setIsOpen(true);
    setOrderId(id);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { allOrders } = useAppSelector((state) => state.orders);

  const { updateLoading } = useAppSelector((state) => state.orders);
  const selectedOrder = allOrders.find((data) => data?.id === orderId);

  // HANDLE DELETE
  const handleDelete = (id: string | undefined) => {
    const formData = {
      id,
      orderProgress: "Cancelled",
    };
    dispatch(updateOrderAsync(formData)).then(() => {
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
      <section className="w-full pt-16 pb-14 sm:pt-12 sm:pb-12 px-5 sm:px-8 lg:px-10 xl:px-0 min-h-[100vh] bg-gray-50">
        <div className="max-w-5xl xl:max-w-6xl mx-auto">
          {!trackOrder?.order ? (
            <>
              <h3 className="text-2xl sm:text-3xl font-semibold text-center w-full uppercase">
                No Order
              </h3>
            </>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold">Order Details</h2>
              <div className="mt-3 text-sm">
                Check the status of recent and old orders
              </div>
              <div className="mt-8 flex flex-col overflow-hidden rounded-xl hover:shadow-blue-100 hover:shadow-md border border-primary/50 md:flex-row">
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
                            key={product?.uniqueId}
                            className="flex px-3 py-3 flex-col justify-between space-x-5 md:flex-row border rounded-xl bg-[#f3f7ff]"
                          >
                            <div className="flex flex-1 items-stretch">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-20 w-20 rounded-lg bg-white border border-gray-200 object-contain"
                                  src={product?.images?.primary?.downloadURL}
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
                                {/* {(product?.sale_price &&
                                        product?.sale_price !== 0) ||
                                      (product?.sale_price ?? 0) > 0 ? (
                                        <p className="">
                                          Rs. {product?.sale_price}
                                        </p>
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
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
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
  );
};

export default OrdersDetails;
