import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedinIn,
  faInstagram,
  faGithub,
  faTwitter,
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
import GlobalStyle from "../GlobalStyle";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Hero from "../components/hero";
import LatestPosts from "../components/latestPosts";
import Contact from "../components/contact";
import Footer from "../components/footer";

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
  faBadgeCheck,
  faLongArrowRight
);

const IndexPage = (props) => {
  return (
    <Layout>
      <SEO title="Home" />
      <GlobalStyle />
      <Hero />
      <LatestPosts />
      <Contact />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
