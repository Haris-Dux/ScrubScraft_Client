
export default function ProductsLoading() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((_data, index) => (
        <div key={index}>
          <div className="group mb-5 relative rounded-lg w-full bg-white border border-gray-300 cursor-pointer animate-pulse">
            <div className="bg-gray-300 h-56 w-full"></div>

            <div className="py-5 text-center">
              <div className="bg-gray-300 h-5 w-3/4 mx-auto mb-2 rounded-lg"></div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
              </div>
              <div className="bg-gray-300 h-4 w-1/2 mx-auto mb-2 rounded-lg"></div>
              <div className="bg-gray-300 h-5 w-1/3 mx-auto mb-2 rounded-lg"></div>
              <div className="bg-gray-300 h-4 w-1/4 mx-auto mb-3 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
