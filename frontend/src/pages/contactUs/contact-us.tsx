import { Helmet } from "react-helmet-async";
import ContactView from "../../sections/contactUs/contact-us-view";

const ContactUsPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us - ScrubsCraft</title>
      </Helmet>

      <ContactView />
    </>
  );
};

export default ContactUsPage;
