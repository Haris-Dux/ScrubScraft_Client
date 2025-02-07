import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FaStar } from "react-icons/fa";
import { ReviewFormData } from "./product-details";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import SkeletonReviews from "./skeleton-reviews";
import DeleteModal from "../../components/custom-dialog/delete-modal";
import {
  deletereviewsAsync,
  getallreviewsAsync,
} from "../../features/reviewsSlice";
import { useState } from "react";
import UpdateReviewModal from "./components/update-review";

interface AllReviewsProps {
  handleSubmitReview: () => void;
  handleStarClick: (starValue: number) => void;
  formData: ReviewFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReviewFormData>>;
  userID?: string;
  productID?: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} className="text-[#FFC209]" />);
  }
  return <span className="flex">{stars}</span>;
};

const AllReviews: React.FC<AllReviewsProps> = ({
  handleSubmitReview,
  handleStarClick,
  formData,
  setFormData,
  userID,
  productID: id,
}) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedMessageId, setMessageSelectedId] = useState<string | null>(
    null
  );

  const openModal = (id: any) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const openReviewModal = (id: any) => {
    setMessageSelectedId(id);
    setIsEdit(true);
  };

  const closeModal = () => setIsOpen(false);
  const closeReviewModal = () => setIsEdit(false);

  const { createReviewLoading } = useAppSelector((state) => state.reviews);
  const { deleteReviewLoading } = useAppSelector((state) => state.reviews);
  const { allReviews, loading } = useAppSelector((state) => state.reviews);

  // Filter reviews by productID
  const selectedReview = allReviews.find(
    (review) => review.id === selectedMessageId
  );
  // console.log("selectedReview", selectedReview);

  const handleDeleteReview = () => {
    if (selectedId) {
      dispatch(deletereviewsAsync({ id: selectedId })).then(() => {
        closeModal();
        if (id) {
          dispatch(getallreviewsAsync(id));
        }
      });
    }
  };

  return (
    <>
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
        {loading ? (
          <SkeletonReviews />
        ) : allReviews?.length > 0 ? (
          <div className="space-y-5">
            {allReviews?.map((data, index) => (
              <div
                key={index}
                className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-blue-200 bg-blue-50 all_reviews hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between flex-wrap items-center gap-2">
                  <div className="left flex font-medium items-center gap-2 capitalize">
                    <h2>{data.name}</h2>
                    <p className="w-24">
                      <StarRating rating={data?.rating} />
                    </p>
                  </div>
                  <div className="text-sm right text-gray-700">
                    <p>{new Date(data?.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between flex-wrap items-center gap-2">
                  <p className="text-sm sm:text-[15px] my-1">{data?.review}</p>
                  <div className="edit flex items-center gap-3">
                    {userID === data.userID && (
                      <>
                        <FiEdit
                          onClick={() => openReviewModal(data?.id)}
                          className="cursor-pointer"
                          size={20}
                        />
                        <IoTrashOutline
                          onClick={() => openModal(data.id)}
                          className="cursor-pointer hover:text-red-600"
                          size={20}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No Reviews</p>
        )}

        {/* CREATE REVIEW */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Write a Review
          </h3>
          <textarea
            id="OrderNotes"
            className="w-full resize-y border border-gray-800 rounded-xl align-top focus:ring-0 focus:outline-none focus:blue-pink-500 sm:text-sm p-4"
            rows={4}
            placeholder="Review"
            value={formData.review}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                review: e.target.value,
              }))
            }
          ></textarea>

          <div className="mt-4 mb-2 flex items-center justify-start gap-1">
            <p className="mr-1 text-gray-700 font-medium text-sm">
              Give your rating:
            </p>
            {[1, 2, 3, 4, 5].map((starValue) => (
              <FaStar
                key={starValue}
                style={{
                  color: starValue <= formData.rating ? "#FFC107" : "#D1D5DB",
                  cursor: "pointer",
                }}
                onClick={() => handleStarClick(starValue)}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={createReviewLoading}
            className="mt-1 text-white py-2 px-4 rounded-md bg-primary hover:bg-primary/90 transition-colors"
            onClick={handleSubmitReview}
          >
            {createReviewLoading ? "Submiting..." : "Submit Review"}
          </button>
        </div>
      </div>

      {selectedReview && (
        <UpdateReviewModal
          productID={id}
          isOpen={isEdit}
          onCancel={closeReviewModal}
          rowData={selectedReview}
        />
      )}

      <DeleteModal
        isOpen={isOpen}
        title="Are You Sure?"
        desc="This reviews will be permanently deleted."
        onConfirm={handleDeleteReview}
        onCancel={closeModal}
        isLoading={deleteReviewLoading}
        buttonName="Delete"
        buttonLoadingName="Deleting..."
      />
    </>
  );
};

export default AllReviews;
