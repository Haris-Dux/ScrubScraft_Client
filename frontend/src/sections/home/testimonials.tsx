import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Marquee from "react-fast-marquee";
import user from "./user.png";

const reviews = [
  {
    id: 1,
    name: "Dr. Ayesha K.",
    role: "Cardiologist",
    rating: 5,
    comment:
      "The quality of ScrubsCraft uniforms is outstanding! Super comfortable and perfect for long shifts.",
  },
  {
    id: 2,
    name: "Imran R.",
    role: "ER Nurse",
    rating: 5,
    comment:
      "As a surgeon, I need flexibility and comfort in my uniform. ScrubsCraft delivers on both!",
  },
  {
    id: 3,
    name: "Dr. Sarah M.",
    role: "Pediatrician",
    rating: 4,
    comment:
      "Absolutely love the fit and feel of these scrubs. They make me feel more professional and confident at work!",
  },
  {
    id: 4,
    name: "Nurse Uzma",
    role: "ER Nurse",
    rating: 5,
    comment:
      "I've tried many scrubs before, but ScrubsCraft sets a new standard in quality and design.",
  },
  {
    id: 5,
    name: "Dr. Anaya P.",
    role: "Pediatrician",
    rating: 4,
    comment:
      "The attention to detail in these scrubs is amazing! Functional pockets, strong stitching, and premium fabric.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 text-white bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-center text-4xl sm:text-4xl font-bold mb-10"
        >
          What Our Customers Are Saying
        </motion.h2>
      </div>

      <div className="Marquee">
        <Marquee direction="left" className="testimonial_marquee mt-14">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: review.id * 0.1 }}
              className="bg-white text-gray-800 border rounded-lg shadow-lg p-6 max-w-sm mx-10 py-6"
            >
              <div className="flex items-center mb-4">
                <img
                  src={user}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-gray-600 text-sm">{review.role}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
