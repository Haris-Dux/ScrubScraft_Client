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

export default function Trusted() {
  return (
    <>
      <section className="pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-0">
          <div className="text-center max-w-3xl mx-auto mb-16 px-4 sm:px-0">
            <h2 className="text-4xl font-bold mb-6">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-gray-600 text-lg">
              Don't just take our word for it. Here's what our customers have to
              say about their ScrubsCraft experience.
            </p>
          </div>

          <div className="Marquee">
            <Marquee
              direction="left"
              className="testimonial_marquee mt-14 pb-10"
            >
              {reviews.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl max-w-md mx-6 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={user}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "{testimonial.comment}"
                  </p>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>
    </>
  );
}
