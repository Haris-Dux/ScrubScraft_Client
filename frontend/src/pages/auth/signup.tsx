import { Helmet } from "react-helmet-async";
import SignupView from "../../sections/auth/singup-view";

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signup - ScrubsCraft</title>
      </Helmet>

      <SignupView />
    </>
  );
};

export default SignupPage;
