import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getallreviewsAsync,
  updatereviewsAsync,
} from "../../../features/reviewsSlice";

export interface ReviewFormData {
  review: string;
  rating: number;
}

interface RowData {
  id: string;
  review: string;
  rating: number;
}

interface UpdateModalProps {
  isOpen: boolean;
  onCancel: () => void;
  rowData: RowData;
  productID?: string;
}

export interface UpdateReviewPayload extends ReviewFormData {
  id: string | undefined;
}

export default function UpdateReviewModal({
  isOpen,
  onCancel,
  rowData,
  productID: id,
}: UpdateModalProps) {
  const productID = id;

  const dispatch = useAppDispatch();
  const [selectedRating, setSelectedRating] = useState<number>();

  const handleUpdateStarClick = (starValue: number) => {
    setSelectedRating(starValue);
  };

  // console.log("rowData", rowData);

  const { updateReviewLoading } = useAppSelector((state) => state.reviews);

  const [updateReviewData, setUpdateReviewData] = useState<ReviewFormData>({
    review: "",
    rating: 1,
  });

  useEffect(() => {
    if (rowData) {
      setUpdateReviewData({
        review: rowData?.review || "",
        rating: rowData?.rating || 1,
      });
      setSelectedRating(rowData?.rating);
    }
  }, [rowData]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateReviewData({
      ...updateReviewData,
      review: e.target.value,
    });
  };

  const handleUpdateReview = (
    review_Id: string | undefined,
    rating: number
  ) => {
    const id = review_Id;

    if (selectedRating !== rating) {
      const updateReviewDataOptional =
        updateReviewData as Partial<ReviewFormData>;
      delete updateReviewDataOptional.rating;

      const payload: Partial<UpdateReviewPayload> = { id, ...updateReviewData };
      payload.rating = selectedRating;

      console.log("payload", payload);

      dispatch(updatereviewsAsync(payload as UpdateReviewPayload)).then(() => {
        dispatch(getallreviewsAsync(productID));
        onCancel();
      });
    } else {
      dispatch(updatereviewsAsync({ id, ...updateReviewData })).then(() => {
        dispatch(getallreviewsAsync(productID));
        onCancel();
      });
      setUpdateReviewData({ review: "", rating: 1 });
    }
  };

  return (
    <>
      {isOpen && (
        // <div
        //   className="fixed inset-0 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-0"
        //   onClick={onCancel}
        // >
        //   <div
        //     className="rounded-lg shadow-xl w-full max-w-2xl mx-auto h-full sm:h-auto sm:max-h-[90vh] flex flex-col"
        //     onClick={(e) => e.stopPropagation()}
        //   >
        <div
          className="fixed inset-0 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-0"
          onClick={onCancel}
        >
          <div
            className="shadow-xl w-full max-w-2xl mx-auto sm:max-h-[90vh] flex flex-col bg-white rounded-xl p-0 sm:px-0 sm:py-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-full bg-white rounded-[1.2rem] shadow-lg p-4 sm:px-6 sm:py-6">
              <h1 className="text-[1.35rem] font-semibold text-gray-800 mb-4">
                Update Review
              </h1>

              <div className="space-y-4">
                <div className="">
                  <textarea
                    id="OrderNotes"
                    className="w-full resize-y border border-gray-800 capitalize rounded-lg sm:rounded-xl align-top focus:ring-0 focus:outline-none focus:border-primary-500 sm:text-sm p-3 sm:p-4"
                    rows={4}
                    placeholder="Write a comment..."
                    value={updateReviewData.review}
                    onChange={handleReviewChange}
                  ></textarea>

                  <div className="mt-4 mb-2 flex items-center justify-start gap-1">
                    <p className="mr-1 text-gray-700 font-medium text-sm">
                      Give your rating:
                    </p>
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <FaStar
                        key={starValue}
                        style={{
                          color:
                            starValue <= (selectedRating || rowData?.rating)
                              ? "#FFC107"
                              : "#D1D5DB",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdateStarClick(starValue)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-start items-center flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    // disabled={isLoading}
                    onClick={() =>
                      handleUpdateReview(rowData?.id, rowData.rating)
                    }
                    className="w-full inline-flex justify-center rounded-lg shadow-sm px-5 py-2.5 bg-primary hover:bg-primary/95 text-base font-medium text-white focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    {updateReviewLoading ? "Updating..." : "Update Review"}
                  </button>

                  <button
                    type="button"
                    onClick={onCancel}
                    className="w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
