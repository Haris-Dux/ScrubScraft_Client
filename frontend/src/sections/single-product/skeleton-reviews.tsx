export default function SkeletonReviews() {
  return (
    <>
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="my-4 px-6 py-4 rounded-xl border border-blue-200 bg-blue-50 duration-300 animate-pulse"
        >
          <div className="flex justify-between flex-wrap items-center gap-2">
            <div className="left flex font-medium items-center gap-2 capitalize">
              <div className="w-20 h-5 bg-gray-300 rounded-md"></div>
              <div className="w-24 h-5 bg-gray-300 rounded-md"></div>
            </div>
            <div className="text-sm right text-gray-700">
              <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
            </div>
          </div>
          <div className="mt-2 flex justify-between flex-wrap items-center gap-2">
            <div className="w-full h-4 bg-gray-300 rounded-md my-1"></div>
          </div>
        </div>
      ))}
    </>
  );
}
