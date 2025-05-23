import { useState } from "react";
import { FilterDropdown } from "../../components/dropdown/filter-dropdown";
import { FiFilter } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { getAllProductsAsync, setFilters } from "../../features/productSlice";

const ProductFilters: React.FC<{
  onFilterChange: (type: string, value: string) => void;
}> = ({ onFilterChange }) => {
 const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const { category, colors, fabric } = useAppSelector(
    (state) => state.products
  );

  const categoryOptions = category?.map((item: any) => item.name) || [];
  const fabricOptions = fabric?.map((item: any) => item.name) || [];
  const colorOptions = colors?.map((item: any) => item.label) || [];

   const {  filters } = useAppSelector(
      (state) => state.products
    );

  return (
    <div className="mx-auto max-w-5xl xl:max-w-6xl xxl:max-w-7xl px-4 md:px-8 lg:px-0 pt-8 pb-0">
      <div className="text-start mb-5 flex justify-between items-center flex-wrap gap-y-3">
        <div className="text">
          <h1 className="mb-1 text-3xl sm:text-4xl font-bold text-gray-800">
            Our Products
          </h1>
          <p className="text-md text-gray-600">
            Experience premium medical uniforms designed for healthcare
            professionals.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          className="flex items-center gap-2 px-2.5 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiFilter className="w-5 h-5" />
          <span className="hidden sm:block">Filters</span>
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isFiltersVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-wrap gap-4 items-center justify-start">
          <FilterDropdown
            label="Category"
            options={categoryOptions}
            onSelect={(value) => onFilterChange("category", value)}
          />
          <FilterDropdown
            label="Fabric"
            options={fabricOptions}
            onSelect={(value) => onFilterChange("fabric_type", value)}
          />
          <FilterDropdown
            label="Color"
            options={colorOptions}
            onSelect={(value) => onFilterChange("color", value)}
          />

          <button
            type="button"
            onClick={() => {
              dispatch(setFilters({ category: "", fabric_type: "", color: "", page: 1 })); 
              dispatch(getAllProductsAsync(filters)); 
              navigate("/products", { replace: true });
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
