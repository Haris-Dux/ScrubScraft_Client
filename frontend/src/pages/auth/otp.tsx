import { Helmet } from "react-helmet-async";
import OtpView from "../../sections/auth/opt-view";

const OtpPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Otp - ScrubsCraft</title>
      </Helmet>

      <OtpView />
    </>
  );
};

export default OtpPage;
