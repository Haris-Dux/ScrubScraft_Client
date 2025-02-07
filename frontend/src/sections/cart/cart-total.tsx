import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import ConfirmCheckoutModal from "./components/confirm-checkout-modal";
import { Link } from "react-router-dom";

interface CartTotalProps {
  totalPrice: number;
}

export default function CartTotal({ totalPrice }: CartTotalProps) {
  const user = useAppSelector((state) => state.auth.user);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  return (
    <>
      <div className="shadow-lg p-4 sm:p-6 lg:sticky lg:top-0 h-max bg-white border border-gray-200 rounded-lg">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
          Cart Total
        </h3>

        <ul className="text-gray-800 divide-y mt-0">
          <li className="flex flex-wrap gap-4 text-base py-4">
            Subtotal <span className="ml-auto">Rs {totalPrice}</span>
          </li>
          <li className="flex flex-wrap gap-4 text-base py-4 font-bold">
            Total <span className="ml-auto">Rs {totalPrice}</span>
          </li>
        </ul>

        {/* BUTTONS */}
        <div className="buttons flex justify-center items-center">
          {user?.login && user?.user ? (
            <Link
              to="/checkout"
              className="mt-2 px-6 py-2.5 text-center hover:bg-primary/90 bg-primary text-white w-full rounded-md"
            >
              Checkout
            </Link>
          ) : (
            <button
              type="button"
              onClick={openModal}
              className="mt-2 px-6 py-2.5 text-center hover:bg-primary/90 bg-primary text-white w-full rounded-md"
            >
              Checkout
            </button>
          )}
        </div>
      </div>

      <ConfirmCheckoutModal isOpen={isOpen} onCancel={closeModal} />
    </>
  );
}
