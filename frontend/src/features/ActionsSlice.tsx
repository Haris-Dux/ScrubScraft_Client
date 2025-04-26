import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  category: string;
  images: {
    primary: {
      downloadURL: string;
      name: string;
    };
  };
  averageRating: number;
  sale_price: number | undefined;
  price: number;
  stock: number;
  color: string;
  trouser: boolean;
  trouser_details: any;
  sizes: string | string[];
  colors: { label: string; value: string }[];
  fabric_type: any;
  description: string;
  product_code: string;
  custom_size: boolean;
}

interface CartItem extends Product {
  quantity: number;
  uniqueId: string;
  name_engraving_charges: any;
  cap: any;
  trouserOptions: any;
  cap_charges: any;
  custom_size: any;
  custom_size_charges: any;
  name_engraving:
    | {
        name: string;
        position: "left" | "right";
      }
    | false
    | null;
}

interface ActionsState {
  cart: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: ActionsState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const loadCartFromLocalStorage = (): ActionsState => {
  const cartState = localStorage.getItem("cart");
  return cartState ? JSON.parse(cartState) : initialState;
};

const ActionsSlice = createSlice({
  name: "actions",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (existingItem) => existingItem.uniqueId === item.uniqueId
      );

      let basePrice = item.sale_price || item.price;

      let engravingCharge = item.name_engraving
        ? item.name_engraving_charges
        : 0;
      let customSizeCharge = item.custom_size ? item.custom_size_charges : 0;
      let capCharge = item.cap ? item.cap_charges : 0;

      let itemTotalPrice =
        basePrice + engravingCharge + capCharge + customSizeCharge;

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({
          ...item,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += itemTotalPrice;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    getCartTotal: (state) => {
      const { totalPrice, totalQuantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const {
            sale_price,
            price,
            quantity,
            name_engraving,
            name_engraving_charges,
            cap,
            cap_charges,
            custom_size_charges,
            custom_size,
          } = cartItem;
          let basePrice = sale_price || price;

          let engravingCharge = name_engraving
            ? name_engraving_charges * quantity
            : 0;
          let customSizeCharge = custom_size
            ? custom_size_charges * quantity
            : 0;
          let capCharge = cap ? cap_charges * quantity : 0;

          let itemTotal =
            basePrice * quantity +
            engravingCharge +
            capCharge +
            customSizeCharge;

          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );

      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const uniqueId = action.payload;
      const removedItemIndex = state.cart.findIndex(
        (item) => item.uniqueId === uniqueId
      );

      if (removedItemIndex !== -1) {
        const removedItem = state.cart[removedItemIndex];
        let basePrice = removedItem.sale_price || removedItem.price;
        let engravingCharge = removedItem.name_engraving
          ? 200 * removedItem.quantity
          : 0;
        let itemTotal = basePrice * removedItem.quantity + engravingCharge;

        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= itemTotal;

        state.cart.splice(removedItemIndex, 1);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const uniqueId = action.payload;
      const itemToIncrease = state.cart.find(
        (item) => item.uniqueId === uniqueId
      );

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        let basePrice = itemToIncrease.sale_price || itemToIncrease.price;
        let engravingCharge = itemToIncrease.name_engraving ? 200 : 0;
        let itemTotalPrice = basePrice + engravingCharge;

        state.totalQuantity += 1;
        state.totalPrice += itemTotalPrice;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const uniqueId = action.payload;
      const itemToDecrease = state.cart.find(
        (item) => item.uniqueId === uniqueId
      );

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
        let basePrice = itemToDecrease.sale_price || itemToDecrease.price;
        let engravingCharge = itemToDecrease.name_engraving ? 200 : 0;
        let itemTotalPrice = basePrice + engravingCharge;

        state.totalQuantity -= 1;
        state.totalPrice -= itemTotalPrice;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartTotal,
  clearCart,
} = ActionsSlice.actions;

export type { Product, CartItem, ActionsState };

export default ActionsSlice.reducer;
