import { Helmet } from "react-helmet-async";
import HomeView from "../../sections/home/view/home-view";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ScrubsCraft</title>
      </Helmet>

      <HomeView />
    </>
  );
};

export default Homepage;
