import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllCategoriesAsync,
  getAllColorsAsync,
  getAllFabricsAsync,
  getAllProductsAsync,
  getLatestProductsAsync,
  setFilters,
} from "../../features/productSlice";
import ProductCard from "../../components/cards/product-card";
import NoProducts from "./no-products";
import "../sections.css";
import ProductFilters from "./filters";

const AllProducts: React.FC = () => {
  const dispatch = useAppDispatch();

  // const { products: allproducts, Productloading } = useAppSelector(
  //   (state) => state.products
  // );

  const { products, Productloading, filters } = useAppSelector(
    (state) => state.products
  );

  const [searchParams] = useSearchParams();
  const page: number = parseInt(searchParams.get("page") || "1", 10);
  const category: string = searchParams.get("category") || "All";

  const renderPaginationLinks = () => {
    const totalPages = products?.totalPages;
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <li onClick={ToTop} key={i}>
          <Link
            to={`/products?category=${category}&page=${i}`}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 ${
              i === page ? "bg-primary text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => dispatch(getAllProductsAsync(filters))}
          >
            {i}
          </Link>
        </li>
      );
    }
    return paginationLinks;
  };

  // useEffect(() => {
  //   dispatch(getAllProductsAsync({ category, page }));
  // }, [dispatch, page, category]);

  useEffect(() => {
    dispatch(getAllProductsAsync(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getLatestProductsAsync());
  }, []);

  const handleFilterChange = (filterType: string, value: string) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const ToTop = () => {
    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(getAllCategoriesAsync()).then((res) => {
      if (res?.payload) {
        // setCategories(res.payload.map((item) => item.name));
      }
    });

    dispatch(getAllColorsAsync()).then((res) => {
      if (res?.payload) {
        // setColorsData(res.payload.map((item) => item.label));
      }
    });

    dispatch(getAllFabricsAsync()).then((res) => {
      if (res?.payload) {
        // setFabricData(res.payload.map((item) => item.name));
      }
    });
  }, []);

  return (
    <>
      <ProductFilters onFilterChange={handleFilterChange} />

      <section>
        <div className="mx-auto max-w-5xl xl:max-w-6xl xxl:max-w-7xl px-4 py-3 sm:px-6 sm:py-0 lg:px-5 xl:px-0">
          <div className="mt-4 w-full">
            <div className="products">
              <ul className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {Productloading ? (
                  <NoProducts />
                ) : (
                  <>
                    {products?.productData?.map((data: any, index: number) => (
                      <ProductCard data={data} key={index} />
                    ))}
                  </>
                )}
              </ul>

              <div className="flex justify-center">
                <nav aria-label="Page navigation example">
                  <ul className="flex items-center -space-x-px h-8 py-10 text-sm">
                    <li>
                      {products?.page > 1 ? (
                        <Link
                          onClick={ToTop}
                          to={`/products?category=${category}&page=${page - 1}`}
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
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg cursor-not-allowed"
                          disabled
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
                        </button>
                      )}
                    </li>
                    {renderPaginationLinks()}
                    <li>
                      {products?.totalPages !== page ? (
                        <Link
                          onClick={ToTop}
                          to={`/products?category=${category}&page=${page + 1}`}
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
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg cursor-not-allowed"
                          disabled
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
                        </button>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProducts;
