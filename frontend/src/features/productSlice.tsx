import axios from "axios";
import { Base_url } from "./constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getAllProductUrl = `${Base_url}/products/getProducts`;
const getProductById = `${Base_url}/products/getProductById`;
const getLatestProductUrl = `${Base_url}/products/getLatestPRoducts`;

const getAllFabricsUrl = `https://api.admin.scrubscraft.shop/productDetails/getAllFabrics`;
const getAllColorsUrl = `https://api.admin.scrubscraft.shop/productDetails/getAllColors`;
const getAllCategoriesUrl = `https://api.admin.scrubscraft.shop/productDetails/getAllCategories`;

// GET ALL PRODUCT ASYNC THUNK
export const getAllProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async (data: any) => {
    try {
      const category =
        data?.category !== undefined && data?.category !== null
          ? `&category=${data?.category}`
          : "";
      const color =
        data?.color !== undefined && data?.color !== null
          ? `&color=${data?.color}`
          : "";
      const fabric_type =
        data?.fabric_type !== undefined && data?.fabric_type !== null
          ? `&fabric_type=${data?.fabric_type}`
          : "";

      const response = await axios.post(
        `${getAllProductUrl}?&page=${data?.page}${category}${color}${fabric_type}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// GET ALL PRODUCT ASYNC THUNK
export const getLatestProductsAsync = createAsyncThunk(
  "products/latest ",
  async () => {
    try {
      const response = await axios.post(getLatestProductUrl);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// GET ALL PRODUCT ASYNC THUNK
export const getProductByIdAsync = createAsyncThunk(
  "products/singleProduct ",
  async (id: string | undefined) => {
    try {
      const response = await axios.post(getProductById, { id });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// GET ALL PRODUCT ASYNC THUNK
export const getProductSizeChart = createAsyncThunk(
  "products/sizechart ",
  async () => {
    try {
      const response = await axios.post(
        "https://api.admin.scrubscraft.shop/picturesrRouter/getAllSizePictures"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getAllCategoriesAsync = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const response = await axios.get(getAllCategoriesUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllColorsAsync = createAsyncThunk(
  "colors/getAllColors",
  async () => {
    try {
      const response = await axios.get(getAllColorsUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllFabricsAsync = createAsyncThunk(
  "fabrics/getAllFabrics",
  async () => {
    try {
      const response = await axios.get(getAllFabricsUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface Image {
  downloadURL: string;
  name: string;
  type: string;
}

interface Images {
  primary: Image;
  image2?: Image;
  image3?: Image;
  image4?: Image;
}

interface BundleDetails {
  main_description: string;
  main_heading: string;
  product_details: ProductDetails[];
  why_choose_us: string[];
}

export interface ProductDetails {
  name: string;
  description: string;
  key_benefits: string[];
  key_ingrediants: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  product_code: string;
  sizes: Array<string>;
  fabric_type: FabricType;
  colors: Array<string>;
  images: Images;
  averageRating: number;
  description: string;
  bundleDescription: BundleDetails;
  sale_price: number | undefined;
  price: number;
  stock: number;
}

interface FabricType {
  name: string;
  price: number;
  _id: string;
}

// INITIAL STATE
interface ProductState {
  loading: boolean;
  Productloading: boolean;
  sizeCharttloading: boolean;
  singleProductloading: boolean;
  sizeChart: Product[] | any;
  products: Product[] | any;
  latestProducts: Product[] | any;
  singleProduct: any | null;
  category: any;
  colors: any;
  fabric: any;
  filters: {
    category: string;
    fabric_type: string;
    color: string;
    size: string;
    page: number;
  };
}

const initialState: ProductState = {
  loading: false,
  Productloading: false,
  singleProductloading: false,
  sizeCharttloading: false,
  sizeChart: [],
  products: [],
  latestProducts: [],
  singleProduct: null,
  category: [],
  colors: [],
  fabric: [],
  filters: {
    category: "",
    fabric_type: "",
    color: "",
    size: "",
    page: 1,
  },
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder

      // GET SIZE CHART ADD CASE
      .addCase(getProductSizeChart.pending, (state) => {
        state.sizeCharttloading = true;
      })
      .addCase(getProductSizeChart.fulfilled, (state, action) => {
        state.sizeCharttloading = false;
        state.sizeChart = action.payload;
      })

      .addCase(getAllProductsAsync.pending, (state) => {
        state.Productloading = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.Productloading = false;
        state.products = action.payload;
      })

      // GET SINGLE PRODUCTS
      .addCase(getProductByIdAsync.pending, (state) => {
        state.singleProductloading = true;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.singleProductloading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getProductByIdAsync.rejected, (state) => {
        state.singleProductloading = false;
      })

      // GET ALL LATEST PRODUCTS ADD CASE
      .addCase(getLatestProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLatestProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.latestProducts = action.payload;
      })

      // GET ALL CATEGORIES ADD CASE
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })

      // GET ALL COLORS ADD CASE
      .addCase(getAllColorsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllColorsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
      })

      // GET ALL FABRICS ADD CASE
      .addCase(getAllFabricsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFabricsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.fabric = action.payload;
      });
  },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
