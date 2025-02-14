import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const HomeCategories = () => {
  const handleMoveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="w-full pt-20 pb-10 px-4 xl:px-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="header text-center">
            <span className="py-1 px-1.5 tracking-wide font-medium text-white bg-primary text-[11px] lg:text-[13px]">
              CATEGORY
            </span>
            <h2 className="mt-2 text-2xl font-semibold md:text-4xl lg:text-5xl md:leading-tight">
              Shop By Categories
            </h2>
            <p className="mt-3 text-gray-800">
              Explore curated categories for the latest trends and timeless
              classics.
            </p>
          </div>

          {/* DATA */}
          <div className="data">
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {/* CARD 1 */}
              <Link
                to="/products?category=Women"
                onClick={handleMoveTop}
                className="relative group overflow-hidden rounded-lg shadow transition hover:shadow-lg"
              >
                <img
                  alt="Women category"
                  src="https://firebasestorage.googleapis.com/v0/b/it-expert-d4328.appspot.com/o/Googly%20Images%2FFemale_Category.png?alt=media&token=87837630-2a2c-44bd-b0a5-cf90b947cb85"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="relative bg-gradient-to-t from-gray-900/50 to-transparent pt-32 sm:pt-48 lg:pt-64">
                  <div className="p-4 sm:p-6">
                    <a href="#">
                      <h3 className="mt-0.5 mb-3 max-w-[10rem] text-3xl font-semibold text-white">
                        Women
                      </h3>

                      <button
                        type="button"
                        className="text-lg flex items-center gap-1 font-semibold text-primary"
                      >
                        Shop Now
                        <IoIosArrowForward className="font-bold" size={17} />
                      </button>
                    </a>
                  </div>
                </div>
              </Link>

              {/* CARD 2 */}
              <Link
                to="/products?category=Men"
                onClick={handleMoveTop}
                className="relative group overflow-hidden rounded-lg shadow transition hover:shadow-lg"
              >
                <img
                  alt="Men Category"
                  src="https://firebasestorage.googleapis.com/v0/b/it-expert-d4328.appspot.com/o/Googly%20Images%2FMale_Category.png?alt=media&token=86ed8d67-871e-482a-99e9-911778a93da3"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="relative bg-gradient-to-t from-gray-900/50 to-transparent pt-32 sm:pt-48 lg:pt-64">
                  <div className="p-4 sm:p-6">
                    <h3 className="mt-0.5 mb-3 max-w-[10rem] text-3xl font-semibold text-white">
                      Men
                    </h3>

                    <button
                      type="button"
                      className="text-lg flex items-center gap-1 font-semibold text-primary"
                    >
                      Shop Now
                      <IoIosArrowForward className="font-bold" size={17} />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCategories;
