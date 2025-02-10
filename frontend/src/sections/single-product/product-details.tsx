import type React from "react";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { StarRating } from "./StarRating";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../../features/ActionsSlice";
import toast from "react-hot-toast";
import { getProductByIdAsync } from "../../features/productSlice";
import AllReviews from "./all-reviews";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import {
  createreviewsAsync,
  getallreviewsAsync,
} from "../../features/reviewsSlice";
import NameEngravingForm from "./components/name-engraving";
import LoadingScreen from "../../components/loading-screen/loading-screen";
import CustomSizeModal from "./components/custom-size-modal";
import { pricingDetailsAsync } from "../../features/orderSlice";
import CapForm from "./components/cap";
// import CapForm from "./components/cap";

export interface ReviewFormData {
  review: string;
  rating: number;
}
export interface CreateReviewPayload extends ReviewFormData {
  productID: string | undefined;
  userID: string | undefined;
}
export interface UpdateReviewPayload extends ReviewFormData {
  id: string | undefined;
}

interface OtherImages {
  [key: string]: {
    downloadURL: string;
    name: string;
  };
}

export const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [mainImage, setMainImage] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [customSize, setCustomSize] = useState();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [cap, setCap] = useState(false);

  const [nameEngraving, setNameEngraving] = useState<{
    name: string;
    position: "left" | "right";
  } | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };

  const [formData, setFormData] = useState<ReviewFormData>({
    review: "",
    rating: 1,
  });

  useEffect(() => {
    if (id) {
      dispatch(getProductByIdAsync(id));
      dispatch(getallreviewsAsync(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(pricingDetailsAsync());
  }, []);

  const { pricing } = useAppSelector((state) => state.orders);

  const user = useAppSelector((state) => state.auth.user);
  const userID = user?.user?.id;

  const { singleProduct, singleProductloading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (singleProduct?.images?.primary?.downloadURL) {
      setMainImage(null);
      setMainImage(singleProduct?.images?.primary?.downloadURL);
    }
  }, [singleProduct]);

  const handleImageClick = (url: string) => {
    setMainImage(url);
  };

  const { primary, ...otherImages } =
    singleProduct?.images ||
    ({} as {
      primary: { downloadURL: string; name: string };
      [key: string]: { downloadURL: string; name: string };
    });

  const handleAddToCart = (path: any) => {
    if ((!selectedSize && !customSize) || !selectedColor || !selectedFabric) {
      let errorMessage = "Please select";
      if (!selectedSize && !customSize) errorMessage += " size";
      if (!selectedColor)
        errorMessage += (!selectedSize && !customSize ? "," : "") + " color";
      if (!selectedFabric)
        errorMessage +=
          ((!selectedSize && !customSize) || !selectedColor ? "," : "") +
          " fabric type";
      toast.error(errorMessage + "!");
      return;
    }

    if (selectedSize && customSize) {
      toast.error("Please select either a size or a custom size, not both!");
      return;
    }

    if (singleProduct) {
      const uniqueId = [
        singleProduct.id,
        selectedSize,
        selectedColor,
        selectedFabric,
        nameEngraving
          ? `engraved-${nameEngraving.name}-${nameEngraving.position}`
          : "no-engraving",
      ].join("-");

      const productToCart: any = {
        ...singleProduct,
        sizes: selectedSize ? selectedSize : false,
        color: selectedColor,
        fabric_type: selectedFabric,
        name_engraving: nameEngraving ? nameEngraving : false,
        name_engraving_charges: pricing[1]?.amount,
        cap_charges: pricing[2]?.amount,
        custom_size_charges: pricing[3]?.amount,
        cap: cap ? cap : false,
        custom_size: customSize ? customSize : false,
        uniqueId,
        quantity: 1,
        _id: singleProduct.id,
      };

      console.log("productToCart", productToCart);

      dispatch(addToCart(productToCart));
      navigate(path);
      toast.success("Item Added to Cart");
    }
  };

  const handleColorClick = (color: { label: string; value: string }) => {
    setSelectedColor(color.label);
  };

  const handleFabricClick = (fabric: string) => {
    setSelectedFabric(fabric);
  };

  const handleStarClick = (starValue: number) => {
    setFormData((prevData) => ({ ...prevData, rating: starValue }));
  };

  const handleSubmitReview = async () => {
    const productID = id;

    console.log("formData", formData);

    if (!formData.review || formData.rating === 0) {
      toast.error("Please leave a review to rate the product");
      return;
    }

    try {
      const response = await dispatch(
        createreviewsAsync({ productID, userID, ...formData })
      );
      console.log("response ", response);
      if (response.payload !== undefined) {
        await dispatch(getallreviewsAsync(id));
      }
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setFormData({ review: "", rating: 1 });
    }
  };

  return (
    <>
      {singleProductloading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-0">
                <div className="w-full overflow-hidden lg:sticky top-0 sm:flex gap-2"></div>
                <div className="w-full lg:sticky top-0">
                  <div className="flex flex-col-reverse sm:flex-row gap-2">
                    <div className="flex flex-row sm:flex-col gap-2 w-16 max-sm:w-14 shrink-0">
                      {primary && (
                        <img
                          src={primary.downloadURL}
                          alt={primary.name}
                          className="w-full h-16 sm:h-20 object-cover cursor-pointer rounded-sm border border-gray-300"
                          onClick={() => handleImageClick(primary.downloadURL)}
                        />
                      )}

                      {Object.keys(otherImages).map((key) => (
                        <img
                          key={key}
                          src={(otherImages as OtherImages)[key].downloadURL}
                          alt={(otherImages as OtherImages)[key].name}
                          className="w-full h-16 sm:h-20 object-cover cursor-pointer rounded-sm border border-gray-300"
                          onClick={() =>
                            handleImageClick(
                              (otherImages as OtherImages)[key].downloadURL
                            )
                          }
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <InnerImageZoom
                        src={mainImage || ""}
                        sources={[
                          {
                            media: "(min-width: 768px)",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3 sm:space-y-4 pt-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                    {singleProduct?.name}
                  </h1>
                  <div className="mt-3 sm:mt-4 flex items-center gap-4 flex-wrap">
                    {/* PRICE */}
                    <h6 className="text-gray-600">
                      {singleProduct?.sale_price &&
                      singleProduct?.sale_price !== 0 ? (
                        <>
                          <span className="font-medium text-sm line-through text-gray-500">
                            Rs.
                          </span>
                          <span className="font-semibold text-[0.90rem] line-through text-gray-500">
                            {singleProduct?.price}
                          </span>
                          <span className="pl-2 font-semibold text-[1.15rem] text-red-600">
                            Rs.
                          </span>
                          <span className="font-semibold text-[1.15rem] text-red-600">
                            {singleProduct?.sale_price}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium text-[1.15rem] text-gray-800">
                            Rs.
                          </span>
                          <span className="font-semibold text-[1.15rem] text-gray-800">
                            {singleProduct?.price}
                          </span>
                        </>
                      )}
                    </h6>

                    {/* RATING */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <StarRating
                        rating={singleProduct?.averageRating}
                        readonly
                      />
                      <span className="text-sm text-gray-500">
                        ({singleProduct?.averageRating} ratings)
                      </span>
                    </div>
                  </div>
                </div>

                {/* PRODUCT CODE AND CATEGORY */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-900">
                      Product Code
                    </span>
                    <p className="text-gray-600">
                      {singleProduct?.product_code}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Category</span>
                    <p className="text-gray-600">{singleProduct?.category}</p>
                  </div>
                </div>

                {/* COLOR */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Choose a Color
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {singleProduct?.colors?.map((color: any) => (
                      <button
                        key={color._id}
                        type="button"
                        title="button"
                        className={`w-9 h-9 border-2 rounded-full shrink-0 flex items-center justify-center ${
                          selectedColor === color.label
                            ? "border-gray-800"
                            : "border-white hover:border-gray-800"
                        }`}
                        onClick={() => handleColorClick(color)}
                      >
                        <div
                          className="w-7 h-7 rounded-full"
                          style={{ backgroundColor: color.value }}
                        ></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* FABRIC TYPE */}
                <div>
                  <div className="header flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Available Fabric
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {singleProduct?.fabric_type?.map((fabric: string) => (
                      <button
                        key={fabric}
                        type="button"
                        className={`px-4 h-9 border-none outline-none text-sm shadow-sm rounded-md flex items-center justify-center shrink-0 
          ${
            selectedFabric === fabric
              ? "bg-primary text-gray-50"
              : "bg-gray-200 text-black"
          }
        `}
                        onClick={() => handleFabricClick(fabric)}
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SIZES */}
                <div>
                  <div className="header flex justify-between items-center flex-wrap gap-2">
                    <div className="left flex justify-start items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Sizes:
                      </h3>
                      <button
                        type="button"
                        onClick={openModal}
                        className="text-sm font-semibold text-primary underline underline-offset-2 cursor-pointer"
                      >
                        Do you want Custom Size? {customSize && "Added"}
                      </button>
                    </div>
                    <Link
                      to="/size-chart"
                      className="text-sm font-semibold text-primary hover:underline underline-offset-2 cursor-pointer"
                    >
                      See sizing chart
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-2">
                    {singleProduct?.sizes?.map((size: string) => (
                      <button
                        key={size}
                        type="button"
                        className={`w-12 h-9 border-none outline-none text-sm shadow-sm rounded-md flex items-center justify-center shrink-0 
              ${
                selectedSize === size
                  ? "bg-primary text-gray-50"
                  : "bg-gray-200 text-black"
              }
            `}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <NameEngravingForm setNameEngraving={setNameEngraving} />
                <CapForm setCap={setCap} />

                {/* ADD TO CART */}
                <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row">
                  <button
                    title="button"
                    type="button"
                    onClick={() => handleAddToCart("/products")}
                    className="mt-1.5 flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    Add To Cart
                  </button>

                  <button
                    title="button"
                    type="button"
                    onClick={() => handleAddToCart("/cart")}
                    className="w-full sm:max-w-40 mx-auto mt-1.5 flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Buy Now
                  </button>
                </div>

                {/* DESCRIPTION */}
                <h3 className="text-md font-semibold text-gray-700">
                      Description
                    </h3>
                <p className="text-gray-600 capitalize">
                  {singleProduct?.description}
                </p>
              </div>
            </div>

            <CustomSizeModal
              setCustomSize={setCustomSize}
              isOpen={isOpen}
              onCancel={closeModal}
            />

            {/* Reviews Section */}
            <AllReviews
              handleSubmitReview={handleSubmitReview}
              handleStarClick={handleStarClick}
              formData={formData}
              setFormData={setFormData}
              userID={userID}
              productID={id}
            />
          </div>
        </>
      )}
    </>
  );
};
