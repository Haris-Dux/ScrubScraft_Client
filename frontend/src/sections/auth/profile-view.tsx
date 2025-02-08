import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { updateuserAsync, userSessionAsync } from "../../features/authSlice";
import toast from "react-hot-toast";
import AuthButton from "./components/auth-button";

const ProfileView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, updateLoading } = useAppSelector((state: any) => state.auth);
  console.log("user", user);
  console.log("updateLoading", updateLoading);

  const userID = user?.user?.id;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const [formData, setFormData] = useState<any>({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phone: user?.user?.phone || "",
    address: user?.user?.address || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.user?.name || "",
        email: user?.user?.email || "",
        phone: user?.user?.phone || "",
        address: user?.user?.address || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = userID;

    const updatedFields: Partial<any> = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== user?.user[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      toast.error("No changes made");
      return;
    }

    console.log("updatedFields", updatedFields);

    dispatch(updateuserAsync({ id, ...updatedFields })).then((res) => {
      if (res.payload.message === "Update Successfull") {
        toast.success(res.payload.message);
      }
      dispatch(userSessionAsync());
    });
  };

  return (
    <>
      <section className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-14 sm:py-0 px-3 sm:px-8 lg:px-10 min-h-[100vh] flex items-center justify-center">
        <div className="w-full">
          <div className="mt-12 content py-4 px-3 sm:p-8 max-w-3xl mx-auto bg-[#f5f5f5] border border-gray-200 rounded-xl">
            <div className="mb-4 sm:mb-8">
              <h2 className="mb-3 playfair text-2xl font-bold text-gray-800">
                Personal Information
              </h2>
              <p className="text-sm text-gray-600">
                Manage your name, password and account settings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                {/* full name label */}
                <div className="sm:col-span-3">
                  <label
                    className="inline-block text-sm text-gray-800 mt-2.5"
                    htmlFor="af-account-full-name"
                  >
                    Fullname
                  </label>
                </div>

                {/* full name input fields */}
                <div className="sm:col-span-9">
                  <div className="sm:flex gap-3">
                    <input
                      className="bg-gray-50 mb-3 sm:mb-0 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-500"
                      placeholder="Enter your Full Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* full email label */}
                <div className="sm:col-span-3">
                  <label
                    className="inline-block text-sm text-gray-800 mt-2.5"
                    htmlFor="af-account-email"
                  >
                    Email
                  </label>
                </div>

                {/* full email input fields */}
                <div className="sm:col-span-9">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-500"
                    id="af-account-email"
                    placeholder="Enter Your Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-3">
                  <div className="inline-block">
                    <label
                      className="inline-block text-sm text-gray-800 mt-2.5"
                      htmlFor="af-account-phone"
                    >
                      Phone
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-9">
                  <div className="sm:flex">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-500"
                      id="af-account-phone"
                      placeholder="Enter Phone Number"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    className="inline-block text-sm text-gray-800 mt-2.5"
                    htmlFor="af-account-bio"
                  >
                    Address
                  </label>
                </div>

                <div className="sm:col-span-9">
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-500"
                    id="af-account-bio"
                    placeholder="Enter Your Address..."
                    rows={5}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="w-full mt-7 flex justify-end items-center gap-x-2">
                <AuthButton
                  text="Save changes"
                  type="submit"
                  isLoading={updateLoading}
                  className="max-w-40 h-11 mx-auto bg-primary rounded-lg text-white tracking-wide"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileView;
