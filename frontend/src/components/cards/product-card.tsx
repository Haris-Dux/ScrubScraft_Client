import { useNavigate } from "react-router-dom";
import CartIcon from "../../assets/svg/cart";
import { StarRating } from "../../helpers/star-rating";

export default function ProductCard({ data }: { data: any }) {
  const navigate = useNavigate();

  const handleItemClick = (productId: string) => {
    navigate(`/selectedItem/${productId}`);
    window.scroll(0, 0);
  };

  return (
    <>
      <div
        onClick={() => handleItemClick(data?.id)}
        className="group overflow-hidden cursor-pointer relative rounded-lg bg-white"
      >
        <div className="bg-gray-100 w-full overflow-hidden">
          <img
            src={data?.images?.primary?.downloadURL}
            alt={data?.name}
            className="aspect-[3/4] w-full object-cover object-top hover:scale-110 transition-all duration-700"
          />
        </div>
        <div className="py-3 px-0 relative">
          <div className="hidden sm:flex flex-wrap justify-center gap-2 w-full absolute px-4 pt-3 z-10 transition-all duration-500 left-0 right-0 group-hover:bottom-20 lg:bottom-5 lg:opacity-0 lg:bg-white lg:group-hover:opacity-100 max-lg:bottom-20 max-lg:py-3 max-lg:bg-white/60">
            <button
              type="button"
              title="Add to cart"
              className="bg-transparent outline-none border-none"
            >
              <CartIcon />
            </button>
          </div>

          <div className="z-20 relative bg-white">
            <h6 className="text-sm sm:text-[15px] text-wrap font-semibold text-gray-800 truncate capitalize">
              {data?.name} - <span className="sm:text-[14px]">{data?.category}</span>
            </h6>

            <h6 className="mt-1 text-gray-600">
              {data?.sale_price ? (
                <>
                  <span className="font-medium text-sm line-through text-gray-500">
                    Rs.
                  </span>
                  <span className="font-semibold text-[0.90rem] line-through text-gray-500">
                    {data?.price}
                  </span>

                  <span className="font-semibold text-[0.93rem] ml-2 text-red-700">Rs.</span>
                  <span className="font-semibold text-[0.93rem] text-red-700">
                    {data?.sale_price}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-medium text-sm">Rs.</span>
                  <span className="font-semibold text-[0.90rem] text-gray-700">
                    {data?.price}
                  </span>
                </>
              )}
            </h6>

            <div className="flex items-center gap-y-2 flex-wrap gap-x-0">
              <StarRating rating={data.averageRating} />
              <span className="text-sm text-gray-500">
                ({data.averageRating} ratings)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
