import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const reasons = [
  "Premium quality materials",
  "Designed by healthcare professionals",
  "Comfortable fit for long shifts",
  "Stylish and professional appearance",
  "Durable and easy to maintain",
  "Wide range of sizes and styles",
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose ScrubsCraft?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start"
            >
              <CheckCircle className="text-gray-50 mr-4 flex-shrink-0" />
              <p className="text-md sm:text-lg">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
