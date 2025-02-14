import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProductSizeChart } from "../../features/productSlice";
import LoadingScreen from "../../components/loading-screen/loading-screen";

export default function SizeChart() {
  const dispatch = useAppDispatch();

  const { sizeChart, sizeCharttloading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductSizeChart());
  }, []);

  return (
    <>
      {sizeCharttloading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12 mt-20">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  SIZE CHART GUIDE
                </h1>
                <p className="text-xl text-gray-600">Scrubs</p>
              </div>
              {sizeChart?.map((data: any, index: number) => (
                <section key={index} className="mb-16">
                  <div className="mb-4">
                    <img
                      src={data?.image?.downloadURL}
                      className="w-full rounded-sm"
                      alt="size-chart image"
                    />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
