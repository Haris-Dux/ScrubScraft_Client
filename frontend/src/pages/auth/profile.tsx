import { Helmet } from "react-helmet-async";
import ProfileView from "../../sections/auth/profile-view";

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile - ScrubsCraft</title>
      </Helmet>

      <ProfileView />
    </>
  );
};

export default ProfilePage;
