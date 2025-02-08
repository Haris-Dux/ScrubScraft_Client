import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createOrderAsync,
  createOrderForGuestAsync,
  getallOrderAsync,
} from "../../features/orderSlice";
import { clearCart } from "../../features/ActionsSlice";
import AuthButton from "../auth/components/auth-button";
import { useNavigate } from "react-router-dom";

export default function DetailsForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formRef = useRef(null);

  const user = useAppSelector((state) => state.auth.user);
  const userID = user?.user?.id;

  const { cart, totalPrice } = useAppSelector((state) => state.actions);
  const { createOrderLoading } = useAppSelector((state) => state.orders);
  const { pricing } = useAppSelector((state) => state.orders);
  let deliveryCharges = pricing[0]?.amount;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    postal_code: "",
    area: "",
    province: "",
    address: "",
    delivery_instruction: "",
  });

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    city: "",
    area: "",
    postal_code: "",
    province: "",
    address: "",
    delivery_instruction: "",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === "") {
        toast.error("Please fill in all fields.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    let totalAmount = totalPrice;
    // const deliveryCharges = 280;

    if (totalAmount < 5000) {
      totalAmount += deliveryCharges;
    }

    const requestData = {
      ...formData,
      items: cart,
      totalAmount: totalAmount.toString(),
    };

    try {
      let response;

      if (userID) {
        response = await dispatch(createOrderAsync({ ...requestData, userID }));
      } else {
        response = await dispatch(
          createOrderForGuestAsync({ ...requestData, userID: undefined })
        );
      }

      if (response?.payload?.success) {
        dispatch(clearCart());
        navigate(`/order-success/${response?.payload?.OrderID}`);

        if (userID) {
          dispatch(getallOrderAsync(userID));
        }
        setFormData(initialFormState);
        toast.success("Order placed successfully!");
      } else {
        throw new Error("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="px-2 py-10 text-gray-900 md:px-2">
      <div className="flow-root">
        <div className="-my-6 divide-y divide-gray-200">
          <div className="py-0">
            <h3
              id="contact-info-heading"
              className="text-3xl font-bold text-gray-900"
            >
              Contact Information
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-5">
              <div className="mb-3 grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                  required
                />
                <input
                  name="phone"
                  type="number"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                  required
                />
                <input
                  name="city"
                  type="text"
                  placeholder="Enter city name"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                  required
                />

                <input
                  name="province"
                  type="text"
                  placeholder="Enter province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                  required
                />
                <input
                  name="postal_code"
                  type="number"
                  placeholder="Enter postal code"
                  value={formData.postal_code}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                  required
                />
              </div>

              <input
                name="area"
                type="text"
                placeholder="Enter your area"
                value={formData.area}
                onChange={handleInputChange}
                className="mb-3 px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                required
              />

              <textarea
                rows={2}
                name="address"
                placeholder="Enter shipping address"
                value={formData.address}
                onChange={handleInputChange}
                className="mb-2 px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                required
              ></textarea>

              <textarea
                rows={3}
                name="delivery_instruction"
                placeholder="Enter delivery instruction"
                value={formData.delivery_instruction}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-400 focus:border-gray-500 outline-none placeholder:text-gray-400 transition-shadow duration-200 focus:shadow-md"
                required
              ></textarea>

              <div className="buttons mt-2">
                <AuthButton
                  text="Order Now"
                  type="submit"
                  isLoading={createOrderLoading}
                  className="text-white bg-blue-500 hover:bg-blue-600"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
