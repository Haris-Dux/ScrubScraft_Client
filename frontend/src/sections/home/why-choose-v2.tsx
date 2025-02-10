import { Heart, Shield, Truck } from "lucide-react";

const WhyChooseV2 = () => {
  return (
    <>
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div> */}
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose ScrubsCraft?</h2>
            <p className="text-gray-600 text-lg">
              We combine premium materials with innovative design to create the
              perfect medical uniforms for healthcare professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                desc: "Medical-grade fabrics that last",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Free shipping on orders over 5000 PKR",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Heart,
                title: "Comfort First",
                desc: "Ergonomic designs for long shifts",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white px-6 py-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseV2;
