import { BlueLabel } from "../../components/label/label";
import TopHeader from "../../components/header/top-header";
//
import "../sections.css";
import Testimonials from "../home/testimonials";

import img06 from "../../assets/aboutImg/img06.jpg";
import img07 from "../../assets/aboutImg/img07.jpg";
import img08 from "../../assets/aboutImg/img08.jpg";

const AboutUsView = () => {
  return (
    <>
      <TopHeader
        title="About Us"
        subtitle="ABOUT US"
        backgroundClass="aboutBanner"
      />

      <section className="py-3 lg:py-16 px-4 sm:px-4 xl:px-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          {/* FIRST CARD */}
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            {/* LEFT SIDE */}
            <div className="left_img group overflow-hidden">
              <img
                className="transition duration-500 group-hover:scale-105 w-full rounded-md"
                src={img06}
                alt=""
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center">
              <div className="ml-2 lg:ml-10">
                <BlueLabel text="Comfort Meets Style" />
                <h2 className="mt-3  mb-1.5 sm:mb-3 text-2xl md:text-3xl font-semibold">
                  Premium Scrubs Redefined
                </h2>
                <p className="mb-7 sm:mb-7 lg:mb-7 text-md max-w-full">
                  At ScrubsCraft, we believe that every healthcare professional
                  deserves more than just a uniform—they deserve a statement of
                  excellence. Founded by Muhammad Azeem, a visionary
                  entrepreneur with a deep passion for quality and
                  craftsmanship, ScrubsCraft is committed to redefining medical
                  attire. With a keen focus on premium materials, precise
                  tailoring, and modern designs, we ensure that doctors, nurses,
                  and hospital staff not only look professional but feel
                  comfortable and confident throughout their demanding shifts.
                </p>
              </div>
            </div>
          </div>

          {/* SECOND CARD */}
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            {/* LEFT SIDE */}
            <div className="flex items-center">
              <div className="ml-2 sm:ml-0 mr-0 lg:mr-10">
                <BlueLabel text="MISSION" />
                <h2 className="mt-3  mb-1.5 sm:mb-3 text-2xl md:text-3xl font-semibold">
                  Our Mission
                </h2>
                <p className="mb-5 sm:mb-5 lg:mb-3 text-md max-w-full">
                  At ScrubsCraft, our mission is simple yet powerful: to empower
                  healthcare professionals with attire that reflects their
                  dedication and excellence. We are committed to creating
                  uniforms that prioritize comfort, durability, and style,
                  allowing doctors, nurses, and hospital staff to focus on what
                  they do best—saving lives and caring for patients.
                </p>
                <p className="mb-7 sm:mb-7 lg:mb-7 text-md max-w-full">
                  Every piece we craft embodies our promise to enhance the
                  professional image of healthcare heroes while ensuring they
                  feel their best throughout the day.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="left_img group overflow-hidden">
              <img
                className="transition duration-500 object-fill group-hover:scale-105 w-full rounded-md"
                src={img07}
                alt=""
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            {/* LEFT SIDE */}
            <div className="left_img group overflow-hidden">
              <img
                className="transition duration-500 group-hover:scale-105 w-full rounded-md"
                src={img08}
                alt=""
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center">
              <div className="ml-2 lg:ml-10">
                <BlueLabel text="Comfort Meets Style" />
                <h2 className="mt-3  mb-1.5 sm:mb-3 text-2xl md:text-3xl font-semibold">
                  Our Commitment to Quality
                </h2>
                <p className="mb-5 sm:mb-5 lg:mb-3 text-md max-w-full">
                  Quality is at the heart of everything we do at ScrubsCraft.
                  From sourcing the finest materials to applying rigorous
                  craftsmanship, we leave no detail overlooked. Every stitch,
                  seam, and fabric choice is a testament to our dedication to
                  providing medical attire that stands the test of time.
                </p>

                <p className="mb-7 sm:mb-7 lg:mb-7 text-md max-w-full">
                  We don’t just create uniforms; we craft garments that reflect
                  professionalism and reliability. Our commitment to
                  export-level standards ensures that every product we deliver
                  embodies perfection, giving healthcare professionals the
                  confidence to excel in their roles while looking and feeling
                  their absolute best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default AboutUsView;
