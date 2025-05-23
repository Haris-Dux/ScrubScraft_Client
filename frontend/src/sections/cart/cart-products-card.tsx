import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

interface CartProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    fabric_type: string;
    sizes: string;
    custom_size: any;
    color: string;
    price: number;
    sale_price?: number;
    quantity: number;
    images: {
      primary: { downloadURL: string };
      image2?: { downloadURL: string };
      image3?: { downloadURL: string };
      image4?: { downloadURL: string };
    };
    description: string;
    product_code: string;
    name_engraving?: {
      name: string;
      position: string;
    };
    averageRating: number;
  };
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartProductCard({
  product,
  onIncrease,
  onDecrease,
  onRemove,
}: CartProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-4">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Product Image */}
          <div className="w-full sm:w-1/4 aspect-[3/4] rounded-lg overflow-hidden">
            <img
              src={product.images.primary.downloadURL || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  Rs. {(product.sale_price || product.price) * product.quantity}
                </p>
                {/* {product.sale_price && (
                  <p className="text-sm text-gray-500 line-through">
                    Rs. {product.price * product.quantity}
                  </p>
                )} */}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Fabric</p>
                <p className="font-medium">{product.fabric_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-medium">{product?.sizes}</p>
                {product.sizes && product?.custom_size
                  ? "Custom size selected"
                  : product.sizes}
                asa
              </div>
              <div>
                <p className="text-sm text-gray-500">Color</p>
                <p className="font-medium">{product.color}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Product Code</p>
                <p className="font-medium">{product.product_code}</p>
              </div>
            </div>

            {product.name_engraving && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Name Engraving</p>
                <p className="font-medium">
                  {product.name_engraving.name} (
                  {product.name_engraving.position} side)
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => onDecrease(product.id)}
                  className="p-2 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="px-4 py-2 font-medium">
                  {product.quantity}
                </span>
                <button
                  onClick={() => onIncrease(product.id)}
                  className="p-2 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
              <button
                onClick={() => onRemove(product.id)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <FiTrash2 className="mr-1" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
