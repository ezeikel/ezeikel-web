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
import GlobalStyle from "../../GlobalStyle";
import SEO from "../seo/seo";
import Header from "../header/header";
import Footer from "../footer/footer";
import { Wrapper, Main } from "./layout.styled";

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
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
