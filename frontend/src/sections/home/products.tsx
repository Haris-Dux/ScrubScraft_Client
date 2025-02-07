import { motion } from "framer-motion";

const products = [
  {
    name: "Classic Scrubs",
    description: "Timeless design for everyday comfort",
  },
  {
    name: "Premium Scrubs",
    description: "Luxurious fabric for the discerning professional",
  },
  {
    name: "Flex Scrubs",
    description: "Maximum mobility for active healthcare workers",
  },
  {
    name: "Printed Scrubs",
    description: "Fun and stylish patterns to brighten your day",
  },
];

export default function Products() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Our Products
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`/placeholder.svg?height=200&width=300&text=${product.name}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <button className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
