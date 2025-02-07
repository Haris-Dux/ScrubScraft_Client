import { MdRemoveRedEye } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

export default function MissionVision() {
  return (
    <>
      <section className="bg-[#1A73E8] text-white my-20">
        <div className="py-5 sm:py-14 max-w-6xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          {/* LEFT BOX */}
          <div className="left_box text-center px-4 sm:px-10 py-12 border-0 md:border-r">
            <TbTargetArrow className="mx-auto" size={50} />
            <h2 className="mt-3 text-4xl font-semibold ">Our Mission</h2>
            <p className="mt-3 font-light">
              Our goal at Studywello is to empower students by offering them
              dependable, convenient, and excellent academic support. In order
              to help students achieve academic success and overcome obstacles
              in their educational journey, we work hard to earn their trust as
              a partner. Our goal is to provide a welcoming environment where
              people can work together to advance learning, excellence, and
              growth.
            </p>
          </div>

          {/* RIGHT BOX */}
          <div className="right_box text-center px-4 sm:px-10 py-12 border-t md:border-0">
            <MdRemoveRedEye className="mx-auto" size={50} />
            <h2 className="mt-3 text-4xl font-semibold">Our Vision</h2>
            <p className="mt-3 font-light">
              At Studywello, our mission is to be the premier academic help
              company, known for our dedication to student success and unmatched
              level of customer care. We picture a day when students from all
              backgrounds may get dependable, inexpensive academic support,
              enabling them to fulfil their educational aspirations. We hope to
              have a beneficial influence on students’ lives all around the
              world by assisting them in realizing their full potential and
              succeeding in their academic endeavors.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
