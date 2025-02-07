import { ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img from '../../assets/top-banners/img05.jpg'

export default function HeroSection() {
  const navigate = useNavigate();

  const handleNavigateToShop = () => {
    navigate("/products");
    window.scroll(0, 0);
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-600 opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 sm:space-y-8">
            <h1 className="mt-20 text-4xl lg:text-7xl font-bold leading-tight">
              Elevate Your
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Medical Uniform
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-blue-100 max-w-xl">
              Experience premium medical uniforms that combine style, comfort,
              and functionality. Designed for healthcare professionals who
              demand the best.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleNavigateToShop}
                type="button"
                className="group bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 transition flex items-center"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-blue-200">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-blue-200">Customer Rating</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* Floating Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src={img}
                alt="Medical Professional"
                className="rounded-2xl transform hover:-translate-y-2 transition duration-500 shadow-lg  w-full h-48"
              />
              <img
                src="https://media.istockphoto.com/id/811283212/photo/doctors-lab-coat-on-hanger-in-laboratory.jpg?s=612x612&w=0&k=20&c=7UD1HqNOIILijJA0qQzkRmdix2ni5g_VwNBPuv0GAek="
                alt="Medical Professional"
                className="rounded-2xl transform translate-y-8 hover:-translate-y-2 transition duration-500 shadow-lg  w-full h-48"
              />
              <img
                src="https://media.istockphoto.com/id/1353357410/photo/unrecognizable-head-nurse-doctor-surgeon-uses-digital-tablet-computer-health-care-vitals.jpg?s=612x612&w=0&k=20&c=11rJ26jRYVYsL68rd-Pt_rX0YLoAe6rd6C-2gJna_dc="
                alt="Medical Professional"
                className="rounded-2xl transform -translate-y-4 hover:-translate-y-6 transition duration-500 shadow-lg  w-full h-48"
              />
              <img
                src="https://media.istockphoto.com/id/855467380/photo/these-hands-will-take-care-of-you.jpg?s=612x612&w=0&k=20&c=UEISS4WF2o0VJuEvKkDyCz0FfEEbgTomXapmxbl-UP0="
                alt="Medical Professional"
                className="rounded-2xl transform translate-y-4 hover:-translate-y-2 transition duration-500 shadow-lg  w-full h-48"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-1 -left-12 bg-white p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Premium Quality
                  </div>
                  <div className="text-sm text-gray-500">
                    Medical Grade Fabric
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
