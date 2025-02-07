import { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// Icons
import { MdPhone } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
// Local components
import TopHeader from "../../components/header/top-header";
import { Button } from "../../components/buttons/button";
import { Label } from "../../components/label/label";
import "../sections.css";

const ContactView: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // HANDLE SUBMIT
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.client.scrubscraft.shop/contact/createContact",
        formdata
      );
      console.log("response", response);
      toast.success(response?.data?.msg);

      if (response.status === 201) {
        setFormdata({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopHeader
        title="Contact Us"
        subtitle="CONTACT US"
        backgroundClass="contact"
      />

      {/* CONTACT SECTION */}
      <section className="pt-0 sm:pt-0 bg-white px-0 sm:px-4">
        <div className="xl:max-w-6xl lg:max-w-5xl max-w-xl mx-auto min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full shadow-2xl">
            {/* --------------- LEFT --------------- */}
            <div className="left px-4 sm:px-10 py-16 bg-primary text-white">
              <div className="content text-center lg:text-start">
                <Label text="CONTACT" />

                <h2 className="mt-4 mb-2 text-4xl md:text-5xl font-medium text-white tracking-normal">
                  Get In Touch
                </h2>

                <p className="text-white py-3">
                  Have questions or need assistance? Our team is here to help!
                  Reach out to us for any inquiries or support, and we'll get
                  back to you promptly.
                </p>

                <div className="mt-6 space-y-2 md:mt-6 flex flex-col justify-center items-start sm:block">
                  <p className="flex items-start">
                    <MdPhone className="text-white size-9 p-2" />
                    <a
                      href="tel:+92 311 4075017"
                      className="mt-1 mx-3 text-white tracking-wide"
                    >
                      0311 4075017
                    </a>
                  </p>

                  <p className="flex items-start">
                    <IoMail className="text-white size-9 p-2" />
                    <a
                      href="mailto:info@scrubscraft.shop"
                      className="mx-3 mt-1 text-white text-wrap"
                    >
                      info@scrubscraft.shop
                    </a>
                  </p>
                  <p className="flex items-start">
                    <FaAddressBook className="text-white size-9 p-2" />
                    <span className="mt-1 mx-3 text-white text-wrap">
                      Awan Market, Main Ferozepur Road, Lahore, Pakistan
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* --------------- RIGHT --------------- */}
            <div className="right">
              <div className="w-full px-4 bg-gray-50 sm:px-10 border border-gray-300 py-10 mx-auto overflow-hidden lg:max-w-xl">
                <h2 className="mt-2 pb-2 text-3xl lg:text-4xl font-bold text-black">
                  Send A Message
                </h2>
                <p className="mt-2 text-black">
                  Have something to say? Drop us a message and we'll get back to
                  you as soon as possible.
                </p>
                {/* FORM */}
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      className="block w-full px-3 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-500 rounded-md focus:outline-none focus:shadow-md"
                      placeholder="Enter Full Name"
                      type="text"
                      value={formdata.name}
                      onChange={(e) =>
                        setFormdata({ ...formdata, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      className="block w-full px-3 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-500 rounded-md focus:outline-none focus:shadow-md"
                      placeholder="Enter Your Email Address"
                      type="email"
                      value={formdata.email}
                      onChange={(e) =>
                        setFormdata({ ...formdata, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      className="block w-full px-3 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-500 rounded-md focus:outline-none focus:shadow-md"
                      placeholder="Enter Your Phone Number"
                      type="number"
                      value={formdata.phone}
                      onChange={(e) =>
                        setFormdata({ ...formdata, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <textarea
                      className="block w-full px-3 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-500 rounded-md focus:outline-none focus:shadow-md"
                      placeholder="Enter Your Message"
                      value={formdata.message}
                      onChange={(e) =>
                        setFormdata({ ...formdata, message: e.target.value })
                      }
                    />
                  </div>

                  <div className="mt-5 flex justify-start items-center">
                    <Button
                      loadingText="Submiting..."
                      type="submit"
                      loading={loading}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactView;
