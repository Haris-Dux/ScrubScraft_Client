interface DeleteModalProps {
  title: string;
  desc: string;
  buttonName: string;
  buttonLoadingName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  isLoading?: boolean;
}

export default function DeleteModal({
  title,
  desc,
  onConfirm,
  onCancel,
  isOpen,
  isLoading,
  buttonName = "Delete",
  buttonLoadingName = "Deleting...",
}: DeleteModalProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={onCancel}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-3 sm:pb-6">
              <div className="flex items-center sm:items-start flex-col sm:flex-row justify-center sm:justify-start sm:space-x-4 gap-y-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-start">
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                  <p className="mt-1 text-[15px] text-gray-700 font-normal">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-2.5 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
              <button
                type="button"
                disabled={isLoading}
                onClick={onConfirm}
                className={`${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                } w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
              >
                {isLoading ? buttonLoadingName : buttonName}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
