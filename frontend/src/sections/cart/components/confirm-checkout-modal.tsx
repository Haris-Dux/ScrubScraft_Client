import { useNavigate } from "react-router-dom";

interface ConfirmCheckoutModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function ConfirmCheckoutModal({
  isOpen,
  onCancel,
}: ConfirmCheckoutModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login?from=cart");
    window.scroll(0, 0);
  };

  const handleGuestCheckout = () => {
    navigate("/checkout");
    window.scroll(0, 0);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-0"
          onClick={onCancel}
        >
          <div
            className="shadow-xl w-full max-w-sm mx-auto sm:max-h-[90vh] flex flex-col bg-white rounded-xl p-0 sm:px-0 sm:py-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-full bg-white rounded-xl shadow-lg p-4 sm:px-6 sm:py-7">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-center mb-3">
                  Almost Done!
                </h2>

                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50 mb-4"
                >
                  Login Now
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGuestCheckout}
                  className="w-full py-2.5 px-4 bg-primary text-white rounded-md hover:bg-primary/90 mb-4"
                >
                  Continue Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
