import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <section className="bg-gray-50">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 min-h-screen flex justify-center items-center">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
              Something's missing.
            </p>
            <p className="mb-8 text-lg font-normal text-gray-800">
              Sorry, we can't find that page. You'll find lots to explore on the home
              page.{" "}
            </p>
            <Link to="/" className="px-4 py-2.5 rounded-lg border bg-blue-500 hover:bg-blue-600 text-white items-center">Back to Homepage</Link>
          </div>
        </div>
      </section>
    </>
  );
}
