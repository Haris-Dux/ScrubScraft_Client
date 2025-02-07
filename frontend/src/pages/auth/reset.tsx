import { Helmet } from "react-helmet-async";
import ResetView from "../../sections/auth/reset-view";

const ResetPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password - ScrubsCraft</title>
      </Helmet>

      <ResetView />
    </>
  );
};

export default ResetPage;
