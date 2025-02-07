import { Helmet } from "react-helmet-async";
import LoginView from "../../sections/auth/login-view";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - ScrubsCraft</title>
      </Helmet>

      <LoginView />
    </>
  );
};

export default LoginPage;
