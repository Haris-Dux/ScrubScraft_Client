import { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// Icons
import { Mail, MapPin, Phone } from "lucide-react";
// Local components
import { Button } from "../../components/buttons/button";
import "../sections.css";

export default function ContactUs() {
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
      // console.log("response", response);
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
      <section className="py-20">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto px-4 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Have questions? We're here to help. Contact our customer support
                team anytime.
              </p>
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Phone className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">
                      <a href="tel:+92 311 4075017">0311 4075017</a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">
                      <a href="mailto:info@scrubscraft.shop">
                        info@scrubscraft.shop
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-600">
                      Awan Market, Main Ferozepur Road, Lahore, Pakistan
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-200 shadow-lg"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your name"
                    value={formdata.name}
                    onChange={(e) =>
                      setFormdata({ ...formdata, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your email"
                    type="email"
                    value={formdata.email}
                    onChange={(e) =>
                      setFormdata({ ...formdata, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Phone
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your phone number"
                    type="number"
                    value={formdata.phone}
                    onChange={(e) =>
                      setFormdata({ ...formdata, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="How can we help you?"
                    value={formdata.message}
                    onChange={(e) =>
                      setFormdata({ ...formdata, message: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="button mt-2">
                <Button
                  loadingText="Submiting..."
                  type="submit"
                  loading={loading}
                  className="w-full py-2.5"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
