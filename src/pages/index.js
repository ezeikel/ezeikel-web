import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLinkedinIn, faInstagram, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBadgeCheck, faHeart as fasHeart, faBookmark as fasBookmark } from "@fortawesome/pro-solid-svg-icons";
import { faComment, faPaperPlane, faHeart as falHeart, faBookmark as falBookmark } from "@fortawesome/pro-light-svg-icons";
import {
  faTablet,
  faBrowser,
  faMobile,
  faMapMarkedAlt,
  faFillDrip,
  faSmile,
} from "@fortawesome/pro-regular-svg-icons";
import GlobalStyle from "../GlobalStyle";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Hero from "../components/hero";

library.add(
  faLinkedinIn,
  faInstagram,
  faGithub,
  faTwitter,
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
  faBadgeCheck
);

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GlobalStyle />
    <Hero />
    {/* <Contact />
    <Footer /> */}
  </Layout>
);

export default IndexPage;
