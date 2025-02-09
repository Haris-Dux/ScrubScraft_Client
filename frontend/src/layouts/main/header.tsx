import { CircleUserRound, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCartTotal } from "../../features/ActionsSlice";
import { mobileAuthRoute, navigation } from "./navigation-links";
import { logoutUserAsync } from "../../features/authSlice";
import { FiTruck } from "react-icons/fi";

export default function Header() {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const isOnHomePage = location.pathname === "/";

  const [state, setState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { cart, totalQuantity } = useAppSelector((state) => state.actions);
  const user = useAppSelector((state) => state.auth.user);
  // console.log("user", user);

  const handleCloseNavbar = () => {
    setState(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickOutside = (event: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const handleLogout = () => {
    dispatch(logoutUserAsync());
    setMenuOpen(!isMenuOpen);
    setState(false);
  };

  return (
    // <nav
    //   className={`fixed w-full z-50 transition-all duration-300
    //   ${
    //     state
    //       ? "bg-white text-black py-2"
    //       : isOnHomePage
    //       ? scrolled
    //         ? "bg-white shadow-lg py-3"
    //         : "bg-white py-4"
    //       : "bg-white shadow-none py-4"
    //   }`}
    // >
    <nav
      className={`fixed w-full z-50 transition-all duration-300   bg-white text-black py-3 sm:py-3`}
    >
      <div className={`items-center px-4 max-w-7xl mx-auto md:flex md:px-8`}>
        <div className="flex items-center justify-between py-0 md:py-0.5 md:block">
          <Link
            to="/"
            onClick={() => window.scroll(0, 0)}
            className="flex items-center space-x-2"
          >
            <img
              src="/images/newLogo.png"
              alt="logo"
              className="h-10"
            />
            <h1
              className={`text-xl sm:text-[1.35rem] font-bold ${
                state
                  ? "text-blue-600"
                  : isOnHomePage
                  ? scrolled
                    ? "text-blue-600"
                    : "text-blue-800"
                  : "text-blue-600"
              }`}
            >
              ScrubsCraft
            </h1>
          </Link>

          {/* HAMBURGER BUTTON */}
          <div className="flex items-center gap-4 md:hidden">
            <Link
              to="/cart"
              onClick={handleCloseNavbar}
              className="block tracking-wide"
            >
              <span className="relative">
                <ShoppingCart
                  size={21}
                  className={`${
                    state
                      ? "text-gray-700"
                      : isOnHomePage
                      ? scrolled
                        ? "text-gray-700"
                        : "text-gray-700"
                      : "text-gray-700"
                  } `}
                />
                <span className="absolute -right-2.5 -top-2.5 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                  {totalQuantity || ""}
                </span>
              </span>
            </Link>

            <button
              type="button"
              className={`mt-1 ${
                state
                  ? "text-gray-700"
                  : isOnHomePage
                  ? scrolled
                    ? "text-gray-600 hover:text-gray-800"
                    : "text-gray-700 hover:text-white"
                  : "text-gray-700"
              }`}
              onClick={() => setState(!state)}
            >
              {state ? <RxCross2 size={23} /> : <RiMenu3Fill size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`flex-1 pb-4 mt-6 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul
            className={`justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 ${
              state
                ? "text-gray-700"
                : isOnHomePage
                ? scrolled
                  ? "text-gray-700"
                  : "text-gray-700"
                : "text-gray-700"
            }`}
          >
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className={`text-[1rem]`}>
                  <Link
                    to={item.path}
                    onClick={handleCloseNavbar}
                    className="block tracking-wide"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}

            {mobileAuthRoute?.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className={`${
                    user?.login && state ? "flex md:hidden" : "hidden"
                  } text-[1rem]`}
                >
                  <Link
                    to={item.path}
                    onClick={handleCloseNavbar}
                    className="block tracking-wide"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}

            {/* LOGOUT BUTTON MOBILE */}
            <li
              className={`${
                user?.login && state ? "flex md:hidden" : "hidden"
              }`}
            >
              <div role="menu">
                <button
                  onClick={handleLogout}
                  className="text-red-700 block w-full px-0 text-left hover:bg-gray-200"
                  id="menu-item-logout"
                  role="menuitem"
                  type="submit"
                >
                  <span className="flex text-md font-normal gap-2">Logout</span>
                </button>
              </div>
            </li>

            {/* LOGIN BUTTON MOBILE */}
            <li
              className={`${
                !user?.login && state ? "flex md:hidden" : "hidden"
              }`}
            >
              <Link
                to="/login"
                onClick={handleCloseNavbar}
                className="bg-blue-700 text-center text-white px-4 py-2 rounded-lg block w-full hover:bg-primary/90"
                id="menu-item-logout"
                role="menuitem"
                type="submit"
              >
                <span className="flex text-md font-normal gap-2">Login</span>
              </Link>
            </li>

            <li className="hidden text-[1rem] text-gray-700 hover:text-indigo-600 sm:flex flex-col md:flex-row justify-start items-start sm:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Link
                to="/order-track"
                onClick={handleCloseNavbar}
                className="block tracking-wide"
              >
                <span className="relative">
                  <FiTruck
                    size={21}
                    className={`${
                      state
                        ? "text-gray-700"
                        : isOnHomePage
                        ? scrolled
                          ? "text-gray-700"
                          : "text-gray-700"
                        : "text-gray-700"
                    } `}
                  />
                </span>
              </Link>

              <Link
                to="/cart"
                onClick={handleCloseNavbar}
                className="block tracking-wide"
              >
                <span className="relative">
                  <ShoppingCart
                    size={21}
                    className={`${
                      state
                        ? "text-gray-700"
                        : isOnHomePage
                        ? scrolled
                          ? "text-gray-700"
                          : "text-gray-700"
                        : "text-gray-700"
                    } `}
                  />
                  <span className="absolute -right-2.5 -top-2.5 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                    {totalQuantity || ""}
                  </span>
                </span>
              </Link>

              {/* <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold 
                           ${
                             state
                               ? "bg-blue-500 text-gray-100"
                               : isOnHomePage
                               ? scrolled
                                 ? "bg-blue-500 text-gray-100"
                                 : "bg-gray-100 text-blue-800"
                               : "bg-blue-500 text-gray-100"
                           }`}
                      > */}

              {user && user?.login ? (
                <div className="relative">
                  <div>
                    <button
                      title="button"
                      id="menu-button"
                      type="button"
                      className="p-0 m-0 flex justify-center items-center capitalize"
                      onClick={() => setMenuOpen(!isMenuOpen)}
                      ref={menuButtonRef}
                    >
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold 
                           ${
                             state
                               ? "bg-blue-500 text-gray-100"
                               : isOnHomePage
                               ? scrolled
                                 ? "bg-blue-500 text-gray-100"
                                 : "bg-blue-500 text-gray-100"
                               : "bg-blue-500 text-gray-100"
                           }`}
                      >
                        {user?.user?.name.charAt(0)}
                      </div>
                    </button>
                  </div>
                  <div
                    aria-labelledby="menu-button"
                    aria-orientation="vertical"
                    className={`${
                      isMenuOpen ? "" : "hidden"
                    } absolute right-0 z-10 mt-5 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu"
                    ref={menuRef}
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/profile"
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        className="text-gray-900 block w-full px-4 py-2 text-left hover:bg-gray-200"
                        id="menu-item-3"
                        role="menuitem"
                        type="submit"
                      >
                        <span className="flex text-md font-normal gap-2">
                          Profile
                        </span>
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        className="text-gray-900 block w-full px-4 py-2 text-left hover:bg-gray-200"
                        id="menu-item-3"
                        role="menuitem"
                        type="submit"
                      >
                        <span className="flex text-md font-normal gap-2">
                          My Orders
                        </span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="text-red-700 block w-full px-4 py-2 text-left hover:bg-gray-200"
                        id="menu-item-3"
                        role="menuitem"
                        type="submit"
                      >
                        <span className="flex text-md font-normal gap-2">
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={handleCloseNavbar}
                  className="block tracking-wide"
                >
                  <span className="relative">
                    <CircleUserRound
                      size={23}
                      className={`${
                        state
                          ? "text-gray-700"
                          : isOnHomePage
                          ? scrolled
                            ? "text-gray-700"
                            : "text-gray-700"
                          : "text-gray-700"
                      } `}
                    />
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
