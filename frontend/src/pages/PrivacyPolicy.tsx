import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Privacy Policy - ScrubsCraft</title>
      </Helmet>

      <section className="bg-[#f5f5f5] pt-14">
        <div className="max-w-6xl px-4 sm:px-6 py-16 mx-auto min-h-screen">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-wide">
            Privacy Policy - ScrubsCraft
          </h2>
          <p className="mb-4 mt-3">
            At ScrubsCraft, we value your trust and are deeply committed to
            protecting your privacy. This Privacy Policy outlines the types of
            information we collect, how we use it, and the measures we take to
            ensure it remains secure.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">
            Information We Collect
          </h2>
          <p className="mb-4">
            To provide you with the best experience while using our services, we
            may collect the following types of information:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Personal Information:</strong> Your name, email address,
              phone number, and shipping address to process orders and
              communicate with you.
            </li>
            <li>
              <strong>Payment Information:</strong> Billing details such as
              credit/debit card numbers and billing addresses for processing
              secure transactions.
            </li>
            <li>
              <strong>Technical Data:</strong> Information like your IP address,
              browser type, and device details to optimize our website
              performance.
            </li>
            <li>
              <strong>Usage Data:</strong> Information on how you interact with
              our website, including pages visited, time spent, and features
              accessed to enhance our services.
            </li>
          </ul>
          <h2 className="mt-6 text-2xl font-bold mb-2">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            The information we gather helps us deliver and improve our services.
            Specifically, we use your data to:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Process and fulfill your orders efficiently.</li>
            <li>
              Communicate with you regarding your account, orders, or inquiries.
            </li>
            <li>Improve website functionality and the user experience.</li>
            <li>Provide personalized recommendations and special offers.</li>
            <li>
              Ensure the security of our platform and prevent fraudulent
              activities.
            </li>
          </ul>
          <h2 className="mt-6 text-2xl font-bold mb-2">
            Sharing Your Information
          </h2>
          <p className="mb-4">
            We respect your privacy and will only share your information in the
            following circumstances:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Service Providers:</strong> Trusted partners who assist us
              in delivering services such as payment processing, order
              fulfillment, or website maintenance.
            </li>
            <li>
              <strong>Legal Compliance:</strong> When required by law, such as
              in response to a court order or subpoena.
            </li>
            <li>
              <strong>Business Transactions:</strong> In the event of a merger,
              acquisition, or sale of company assets, your information may be
              transferred as part of the business operation.
            </li>
          </ul>
          <h2 className="mt-6 text-2xl font-bold mb-2">Data Security</h2>
          <p className="mb-4">
            Protecting your information is a priority at ScrubsCraft. We
            implement industry-standard security measures to safeguard your
            data. However, no system is entirely secure, and we cannot guarantee
            absolute protection against unauthorized access or breaches.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">
            Updates to This Policy
          </h2>
          <p className="mb-4">
            We may revise this Privacy Policy as our practices or legal
            obligations evolve. Any updates will be reflected on this page, and
            we encourage you to review it periodically to stay informed.
          </p>
          <h2 className="mt-6 text-2xl font-bold mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy or how we handle
            your information, please reach out to us at{" "}
            <a href="mailto:support@scrubscraft.com" target="_blank">
              info@scrubscraft.shop
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
