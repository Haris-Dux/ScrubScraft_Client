import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    description: {
      type: String,
      required: [true, "Description required"],
    },
    price: {
      type: Number,
      required: [true, "Price required"],
    },
    sale_price: {
      type: Number,
      default: 0,
    },
    product_code: {
      type: String,
      required: [true, "product_code required"],
    },
    image: {
      downloadURL: { type: String, required: [true, "image Link required"] },
      name: { type: String },
      type: { type: String },
    },
    category: {
      type: String,
      required: [true, "category required"],
    },
    colors: [{ type: String, required: [true, "colors required"] }],
    sizes: [
      {
        type: String,
        required: [true, "size required"],
        enum: ["XS", "S", "M", "L", "Xl", "XXL"],
      },
    ],
    fabric_type: [
      {
        type: String,
        required: [true, "fabric type required"],
      },
    ],
    latest: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ProductsModel = mongoose.model("Products", productsSchema);
