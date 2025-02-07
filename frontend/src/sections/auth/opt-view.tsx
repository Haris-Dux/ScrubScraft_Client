import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyOtpAsync } from "../../features/authSlice";
import { useAppDispatch } from "../../app/hooks";
import AuthButton from "./components/auth-button";

export interface FormData {
  otp: string;
  userId: string | undefined;
}

const OtpView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const { id } = params;
  const [formData, setFormData] = useState<FormData>({
    otp: "",
    userId: id,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(verifyOtpAsync(formData)).then((res: any) => {
      if (res.payload.OtpVerified) {
        navigate(`/reset/${id}/${res.payload.OtpVerified.toString()}`);
        setFormData({
          otp: "",
          userId: id,
        });
      }
    });
  };

  return (
    <>
      <section className="py-7 sm:py-10 px-4 sm:px-4 md:px-14 bg-white">
        <div className="max-w-5xl xl:max-w-4xl mx-auto">
          <div className="flex justify-center items-center flex-col-reverse sm:flex-row gap-10 md:gap-2 min-h-[90vh]">
            {/* IMAGE SIDE */}
            <div className="min-w-[50%] mx-auto hidden md:flex">
              <img
                className="w-[90%] h-[22rem] object-cover rounded-lg"
                src="https://media.istockphoto.com/id/1353357410/photo/unrecognizable-head-nurse-doctor-surgeon-uses-digital-tablet-computer-health-care-vitals.jpg?s=612x612&w=0&k=20&c=11rJ26jRYVYsL68rd-Pt_rX0YLoAe6rd6C-2gJna_dc="
                alt="login Img"
              />
            </div>

            {/* FORM SIDE */}
            <div className="min-w-[60%] md:min-w-[50%]">
              <h1 className="playfair max-w-xs sm:max-w-full mb-5 text-4xl sm:text-4xl font-bold">
                OTP Verification
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* EMAIL */}
                <div>
                  <input
                    title="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-3"
                    type="number"
                    id="otp"
                    name="otp"
                    placeholder=""
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData({ ...formData, otp: e.target.value })
                    }
                    required
                  />
                </div>

                {/* <button
                  type="submit"
                  className="w-full h-11 items-center mx-auto bg-primary text-white flex justify-center tracking-wide"
                >
                  SUBMIT NOW
                </button> */}

                <AuthButton
                  text="Submit"
                  type="submit"
                  isLoading={false}
                  onClick={() => console.log("Button clicked")}
                  className="text-white bg-blue-500 hover:bg-blue-600"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpView;
