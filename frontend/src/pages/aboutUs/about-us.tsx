import { Helmet } from "react-helmet-async";
import AboutUsView from "../../sections/aboutUs/about-us-view";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us - ScrubsCraft</title>
      </Helmet>

      <AboutUsView />
    </>
  );
};

export default AboutUsPage;
