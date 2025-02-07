import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderProductCard from "../../components/cards/slider-card";
import HeaderV2 from "../../components/header/header-v2";

interface Image {
  downloadURL: string;
  name: string;
  type: string;
}
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: Image;
  averageRating: number;
  sale_price: number | undefined;
  price: number;
  stock: number;
}

const LatestProducts = ({ latestProducts }: { latestProducts: Product[] }) => {
  const sliderRef = useRef<Slider>(null);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesToShow(4); // Full Desktop view
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(3); // Desktop view
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); // Tablet view
      } else {
        setSlidesToShow(1); // Mobile view
      }
    };

    // Initial update
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="py-14 sm:py-16 px-5 sm:px-4 xl:px-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          {/* HEADER */}
          <HeaderV2
            badgeText="LATEST"
            title="Latest Products"
            description="Explore our hottest picks! Discover the most sought-after eyewear styles loved by our customers."
          />

          {/* DATA */}
          <div className="data">
            <div className="relative mt-8 sm:mt-12">
              <>
                <Slider ref={sliderRef} {...settings}>
                  {latestProducts?.map((data, index) => (
                    <SliderProductCard data={data} key={index} />
                  ))}
                </Slider>

                <button
                  type="button"
                  title="arrows"
                  onClick={previous}
                  className="ml-8 xl:ml-0 absolute top-[40%] -left-4 mx-1.5 hidden sm:inline-block rounded-full border text-white bg-primary hover:text-white border-primary p-2.5 focus:outline-none"
                >
                  <IoIosArrowBack size={22} />
                </button>

                <button
                  type="button"
                  title="arrows"
                  onClick={next}
                  className="mr-8 xl:mr-0 absolute top-[40%] -right-4 mx-1.5 hidden sm:inline-block rounded-full border text-white bg-primary hover:text-white border-primary p-2.5 focus:outline-none"
                >
                  <IoIosArrowForward size={22} />
                </button>
              </>
            </div>

            <div className="slider_button sm:hidden flex flex-row justify-center">
              {/* left arrow */}
              <button
                title="arrows"
                type="button"
                onClick={previous}
                className="mx-1.5 inline-block rounded-full border text-primary border-primary p-2.5 focus:outline-none"
              >
                <IoIosArrowBack size={22} />
              </button>

              {/* right arrow */}
              <button
                title="arrows"
                type="button"
                onClick={next}
                className="mx-1.5 inline-block rounded-full border text-primary border-primary p-2.5 focus:outline-none"
              >
                <IoIosArrowForward size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestProducts;
