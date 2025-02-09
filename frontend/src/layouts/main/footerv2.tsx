import { Link } from "react-router-dom";
import { FaInstagram, FaPhone } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "products" },
    { name: "About Us", href: "about" },
  ];

  const othersLinks = [
    { name: "Privacy Policy", href: "privacy-policy" },
    { name: "Terms & Condition", href: "tac" },
    { name: "Contact Us", href: "contact" },
  ];

  const socialLinks = [
    {
      icon: <FiFacebook size={22} />,
      href: "https://www.facebook.com/ScrubsCraft",
      title: "Facebook",
    },
    {
      icon: <FaInstagram size={22} />,
      href: "https://www.instagram.com/scrubscraft",
      title: "Instagram",
    },
  ];

  return (
    <>
      <footer className="w-full bg-blue-100 text-black">
        <div className="max-w-7xl mx-auto">
          {/* FOOTER UPPER PART  */}
          <div className="pt-16 pb-24 px-4 md:px-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-5">
            {/* LOGO & HEADING */}
            <div className="sm:col-span-2">
              <h1 className="max-w-lg flex items-center text-xl font-semibold tracking-tight text-black xl:text-2xl">
                <img
                  className="w-auto h-24"
                  src={"/images/newLogo.png"}
                  alt="logo"
                />
              </h1>
              <p className="max-w-sm text-[1rem] mt-1">
                Experience premium medical uniforms that combine style, comfort,
                and functionality.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <p className="mb-2 text-xl font-semibold text-black">
                Quick Links
              </p>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-800 hover:text-blue-800 transition duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SHOP */}
            <div>
              <p className="mb-2 text-xl font-semibold text-black">
                Other Links
              </p>
              <ul className="space-y-2">
                {othersLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-800 hover:text-gray-800 transition duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* PRODUCT & CATEGORIES */}
            <div>
              <p className="text-xl font-semibold text-black">Contact Info</p>
              <div className="flex flex-col items-start mt-3 space-y-2">
                {/* PHONE NUMBER */}
                <a
                  href="tel:+92 311 4075017"
                  className="flex items-center gap-2"
                >
                  <FaPhone /> 0311 4075017
                </a>
                {/* EMAIL LINK */}
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>

                  <a
                    href="mailto:info@scrubscraft.shop"
                    target="_blank"
                    className="sm:flex-1 text-black"
                  >
                    info@scrubscraft.shop
                  </a>
                </div>

                {/* SOCIAL LINKS */}
                <div className="links pt-2 flex items-center justify-start gap-2.5">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      title={social.title}
                      target="_blank"
                      className="text-gray-700 transition duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM PART  */}
        <div className="text-sm py-5 px-4 md:px-10 border-t bg-primary text-center text-white">
          <p>Copyrights ©2025 All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
