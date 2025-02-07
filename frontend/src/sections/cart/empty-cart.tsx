import { Link } from "react-router-dom";
import cart from "../../assets/images/cart.png";

const EmptyCart = () => {
  return (
    <>
      <div className="container text-gray-800">
        <div className="mx-0 text-center">
          <div className="py-5">
            <img className="w-64 mx-auto" src={cart} alt="cart image" />
            <h3 className="mt-5 text-xl font-medium">No Item In Cart</h3>
            <Link
              to="/products"
              className="mt-2 text-xl font-medium text-primary underline underline-offset-2"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
