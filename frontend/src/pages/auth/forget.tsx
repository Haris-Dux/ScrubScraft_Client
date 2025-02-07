import { Helmet } from "react-helmet-async";
import ForgetView from "../../sections/auth/forget-view";

const ForgetPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget - ScrubsCraft</title>
      </Helmet>

      <ForgetView />
    </>
  );
};

export default ForgetPage;
