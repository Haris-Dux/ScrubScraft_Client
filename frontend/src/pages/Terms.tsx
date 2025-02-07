import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Terms & Conditions - ScrubsCraft</title>
      </Helmet>

      <section className="bg-[#f5f5f5] pt-14">
        <div className="max-w-6xl px-4 sm:px-6 py-16 mx-auto min-h-screen">
          <h2 className="poppin text-3xl lg:text-4xl font-bold tracking-wide">
            Terms and Conditions - ScrubsCraft
          </h2>
          <p className="mb-4 mt-3">
            Welcome to ScrubsCraft! By using our website, products, and
            services, you agree to comply with and be bound by the following
            Terms and Conditions. Please read them carefully before placing an
            order or using our website.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">General Terms</h2>
          <p className="mb-4">
            These Terms and Conditions govern your use of ScrubsCraft’s website
            and services. By accessing or using our platform, you agree to these
            terms, as well as our Privacy Policy. If you do not agree, you must
            not use our services.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">Use of the Website</h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              You agree to use this website for lawful purposes only. Misuse of
              the site, including attempting to harm, disrupt, or exploit the
              services, is strictly prohibited.
            </li>
            <li>
              All content on this website, including text, images, designs, and
              logos, is the property of ScrubsCraft and is protected under
              copyright laws. Unauthorized reproduction or distribution is not
              permitted.
            </li>
            <li>
              ScrubsCraft reserves the right to restrict access to certain parts
              of the website or the entire platform at its sole discretion.
            </li>
          </ul>
          <h2 className="mt-6 text-2xl font-bold mb-2">Orders and Payments</h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Placing Orders:</strong> All orders placed through our
              website are subject to availability. We reserve the right to
              cancel or refuse any order at our discretion.
            </li>
            <li>
              <strong>Payment:</strong> All payments must be made at the time of
              purchase using accepted payment methods. Prices are subject to
              change without prior notice.
            </li>
            <li>
              <strong>Order Changes:</strong> Once an order is placed, changes
              may not be possible. Please contact our support team as soon as
              possible for assistance.
            </li>
          </ul>
          <h2 className="mt-6 text-2xl font-bold mb-2">
            Shipping and Delivery
          </h2>
          <p className="mb-4">
            We strive to deliver your orders promptly. Delivery times may vary
            based on your location and chosen shipping method. ScrubsCraft is
            not responsible for delays caused by third-party carriers or events
            beyond our control.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">
            Limitation of Liability
          </h2>
          <p className="mb-4">
            ScrubsCraft is not liable for any indirect, incidental, or
            consequential damages arising from the use of our website, products,
            or services. Our liability is limited to the purchase price of the
            products you have ordered.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">Changes to the Terms</h2>
          <p className="mb-4">
            ScrubsCraft reserves the right to update these Terms and Conditions
            at any time. Changes will take effect immediately upon posting to
            this page. It is your responsibility to review this page regularly
            for updates.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">Governing Law</h2>
          <p className="mb-4">
            These Terms and Conditions are governed by and construed in
            accordance with the laws of Pakistan. Any disputes arising from the
            use of our website or services will be subject to the exclusive
            jurisdiction of the courts in Pakistan.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <a href="mailto:support@scrubscraft.com" target="_blank">
              info@scrubscraft.shop
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default Terms;
