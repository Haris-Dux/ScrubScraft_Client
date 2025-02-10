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
import "../sections.css";
import ProductFilters from "./filters";
import ProductsLoading from "./no-products";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AllProducts: React.FC = () => {
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(setFilters({ ...filters, page })); // Ensure page is updated in filters
  }, [page]);

  useEffect(() => {
    dispatch(getAllProductsAsync(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getLatestProductsAsync());
  }, []);

 
  const handleFilterChange = (filterType: string, value: string) => {
    dispatch(setFilters({ ...filters, [filterType]: value, page: 1 }));
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

              {products?.productData?.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProducts;
