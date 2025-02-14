import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// Redux hooks
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// Redux actions
import {
  getAllCategoriesAsync,
  getAllColorsAsync,
  getAllFabricsAsync,
  getAllProductsAsync,
} from "../../features/productSlice";
// Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// Components
import ProductCard from "../../components/cards/product-card";
// import ProductFilters from "./filters";
import ProductsLoading from "./no-products";
import { ToTop } from "./product-helpers";
import "../sections.css";
import { FilterDropdown } from "../../components/dropdown/filter-dropdown";
import { MdRestartAlt } from "react-icons/md";

const AllProducts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  // const [searchParams] = useSearchParams();

  // const page: number = parseInt(searchParams.get("page") || "1", 10);
  // const paramCategory: string = searchParams.get("category") || "All";

  const paramCategory: string = searchParams.get("category") || "All";
  const paramColor: string = searchParams.get("color") || "";
  const paramFabric: string = searchParams.get("fabric_type") || "";
  const page: number = parseInt(searchParams.get("page") || "1", 10);

  // console.log("category in params", paramCategory);

  const { products, Productloading } = useAppSelector(
    (state) => state.products
  );

  // useEffect(() => {
  //   // const hasFilters =
  //   // paramCategory !== "All" || paramColor !== "All" || paramFabric !== "All";

  //   if (paramCategory !== "All" || paramColor !== "" || paramFabric !== "") {
  //     dispatch(
  //       getAllProductsAsync({
  //         page,
  //         category: paramCategory,
  //         color: paramColor,
  //         fabric_type: paramFabric,
  //       })
  //     );
  //   }
  // }, [page, paramCategory, paramColor, paramFabric, dispatch]);

  useEffect(() => {
    dispatch(
      getAllProductsAsync({
        page,
        category: paramCategory !== "All" ? paramCategory : "",
        color: paramColor || "",
        fabric_type: paramFabric || "",
      })
    );
  }, [page, paramCategory, paramColor, paramFabric, dispatch]);

  const renderPaginationLinks = () => {
    const totalPages = products?.totalPages;
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <li key={i} onClick={ToTop}>
          <Link
            to={`/products?page=${i}`}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 ${
              i === page ? "bg-primary text-white" : "hover:bg-gray-100"
            }`}
          >
            {i}
          </Link>
        </li>
      );
    }
    return paginationLinks;
  };

  const handleResetFilters = () => {
    // Reset the URL to only have the page parameter
    setSearchParams({ page: "1" });

    // Dispatch API call with no filters
    dispatch(
      getAllProductsAsync({ page: 1, category: "", color: "", fabric_type: "" })
    );

    // Navigate to reset filters in URL
    navigate("/products?page=1");
  };

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
    dispatch(getAllColorsAsync());
    dispatch(getAllFabricsAsync());
  }, [dispatch]);

  const { category, colors, fabric } = useAppSelector(
    (state) => state.products
  );

  // console.log("category from admin side ===>", category);

  const categoryOptions = category?.map((item: any) => item.name) || [];
  const fabricOptions = fabric?.map((item: any) => item.name) || [];
  const colorOptions = colors?.map((item: any) => item.label) || [];

  // Function to update filters in URL
  const handleFilterChange = (filterType: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterType, value);
    newParams.set("page", "1");
    setSearchParams(newParams);
    navigate(`/products?${newParams.toString()}`);
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-5xl xl:max-w-6xl xxl:max-w-7xl px-4 py-3 sm:px-6 sm:py-0 lg:px-5 xl:px-0">
          <div className="mt-6 w-full">
            <div className="mb-5 text">
              <h1 className="mb-1 text-3xl sm:text-4xl font-bold text-gray-800">
                Our Products
              </h1>
              <p className="text-md text-gray-600">
                Experience premium medical uniforms designed for healthcare
                professionals.
              </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-2 sm:gap-4 items-center justify-start">
              <FilterDropdown
                label="Category"
                options={categoryOptions}
                selected={paramCategory}
                onSelect={(value) => handleFilterChange("category", value)}
              />
              <FilterDropdown
                label="Fabric"
                options={fabricOptions}
                selected={paramFabric}
                onSelect={(value) => handleFilterChange("fabric_type", value)}
              />
              <FilterDropdown
                label="Color"
                options={colorOptions}
                selected={paramColor}
                onSelect={(value) => handleFilterChange("color", value)}
              />

              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-primary/90 hover:bg-primary/80 text-white p-2 rounded-full transition duration-300 transform hover:rotate-180"
                title="Reset Filters"
              >
                <MdRestartAlt className="w-6 h-6" />
              </button>
            </div>

            {[paramCategory, paramFabric, paramColor].some(
              (filter) => filter && filter !== "All"
            ) && (
              <div className="mb-4 flex flex-wrap gap-2 sm:gap-3 items-center justify-start">
                <span className="text-[14px] font-medium text-gray-700 tracking-wide">
                  Filters:{" "}
                </span>
                {[paramCategory, paramFabric, paramColor]
                  .filter((filter) => filter && filter !== "All")
                  .map((filter) => (
                    <span
                      key={filter}
                      className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-medium text-[13px]"
                    >
                      {filter}
                    </span>
                  ))}
              </div>
            )}

            <div className="products">
              <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {Productloading ? (
                  <ProductsLoading />
                ) : products?.productData?.length === 0 ? (
                  <div className="col-span-4 w-full text-center">
                    No products available
                  </div>
                ) : (
                  <>
                    {products?.productData?.map((data: any, index: number) => (
                      <ProductCard data={data} key={index} />
                    ))}
                  </>
                )}
              </div>

              <section className="flex justify-center">
                <nav aria-label="Page navigation example">
                  <ul className="flex items-center -space-x-px h-8 py-10 text-sm">
                    <li>
                      {products?.page > 1 ? (
                        <Link
                          onClick={ToTop}
                          to={`/products?page=${page - 1}`}
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                          <span className="sr-only">Previous</span>
                          <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 1 1 5l4 4"
                            />
                          </svg>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-800 bg-white border border-e-0 border-gray-300 rounded-s-lg cursor-not-allowed"
                          disabled
                        >
                          <span className="sr-only">Previous</span>
                          <IoIosArrowBack size={16} />
                        </button>
                      )}
                    </li>
                    {renderPaginationLinks()}
                    <li>
                      {products?.totalPages !== page ? (
                        <Link
                          onClick={ToTop}
                          to={`/products?page=${page + 1}`}
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 9 4-4-4-4"
                            />
                          </svg>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-800 bg-white border border-gray-300 rounded-e-lg cursor-not-allowed"
                          disabled
                        >
                          <span className="sr-only">Next</span>
                          <IoIosArrowForward size={16} />
                        </button>
                      )}
                    </li>
                  </ul>
                </nav>
              </section>

              {/* {products?.productData?.length > 0 && (
                <div className="flex justify-center">
                  <nav aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px h-8 py-10 text-sm">
                      <li>
                        {products?.page > 1 ? (
                          <Link
                            onClick={ToTop}
                            to={`/products?category=${category}&page=${
                              page - 1
                            }`}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-800 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                          >
                            <span className="sr-only">Previous</span>
                            <IoIosArrowBack size={16} />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-800 bg-white border border-e-0 border-gray-300 rounded-s-lg cursor-not-allowed"
                            disabled
                          >
                            <span className="sr-only">Previous</span>
                            <IoIosArrowBack size={16} />
                          </button>
                        )}
                      </li>
                      {renderPaginationLinks()}
                      <li>
                        {products?.totalPages !== page ? (
                          <Link
                            onClick={ToTop}
                            to={`/products?category=${category}&page=${
                              page + 1
                            }`}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-800 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                          >
                            <span className="sr-only">Next</span>
                            <IoIosArrowForward size={16} />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-800 bg-white border border-gray-300 rounded-e-lg cursor-not-allowed"
                            disabled
                          >
                            <span className="sr-only">Next</span>
                            <IoIosArrowForward size={16} />
                          </button>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProducts;
