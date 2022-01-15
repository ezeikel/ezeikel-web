import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedinIn,
  faInstagram,
  faGithub,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBadgeCheck,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faComment,
  faPaperPlane,
  faHeart as falHeart,
  faBookmark as falBookmark,
} from "@fortawesome/pro-light-svg-icons";
import {
  faTablet,
  faBrowser,
  faMobile,
  faMapMarkedAlt,
  faFillDrip,
  faSmile,
  faLongArrowRight,
} from "@fortawesome/pro-regular-svg-icons";
import SEO from "../seo/seo";
import Header from "../header/header";
import Footer from "../footer/footer";

library.add(
  faLinkedinIn,
  faInstagram,
  faGithub,
  faTwitter,
  faYoutube,
  faTablet,
  faBrowser,
  faMobile,
  faMapMarkedAlt,
  faFillDrip,
  faPaperPlane,
  faComment,
  falHeart,
  fasHeart,
  fasBookmark,
  falBookmark,
  faSmile,
  faBadgeCheck,
  faLongArrowRight,
);

const Layout = ({ pageTitle, children }) => {
  return (
    <>
      <SEO title={pageTitle} />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 grid grid-cols-[32px_1fr_32px] gap-y-16 main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
