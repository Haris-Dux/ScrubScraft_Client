import { motion } from "framer-motion";

export default function HomeAbout() {
  return (
    <section className="py-20 bg-lightSurface">
      <div className="mx-auto px-4 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-2xl text-gray-800 font-bold md:text-4xl lg:text-[2.75rem] md:leading-tight text-center"
        >
          About ScrubsCraft
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 mb-8 md:mb-0 flex justify-center items-center"
          >
            <img
              src=""
              alt="ScrubsCraft team"
              className="w-[60%]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2 md:pl-8"
          >
            <p className="text-lg mb-4 text-gray-700">
              At ScrubsCraft, we're passionate about providing high-quality,
              comfortable, and stylish medical attire for healthcare
              professionals. Our team of experienced designers and healthcare
              experts work together to create scrubs that meet the unique needs
              of doctors, nurses, and other medical staff.
            </p>
            <p className="text-lg mb-4 text-gray-700">
              Founded in 2010, we've been dedicated to innovating and improving
              medical workwear, ensuring that healthcare heroes look and feel
              their best while providing exceptional care to their patients.
            </p>
            <p className="text-lg text-gray-700">
              Our commitment to quality, comfort, and style has made ScrubsCraft
              a trusted name in the healthcare industry, and we continue to
              strive for excellence in everything we do.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
