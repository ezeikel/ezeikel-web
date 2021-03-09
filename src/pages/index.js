import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import {
  far,
  faTablet,
  faBrowser,
  faMobile,
  faMapMarkedAlt,
  faFillDrip,
  faPaperPlane,
  faBookmark,
  faSmile,
} from "@fortawesome/pro-regular-svg-icons";
import GlobalStyle from "../GlobalStyle";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Background from "../components/background";
import Contact from "../components/contact";

library.add(
  fab,
  fal,
  far,
  fas,
  faTablet,
  faBrowser,
  faMobile,
  faMapMarkedAlt,
  faFillDrip,
  faPaperPlane,
  faBookmark,
  faSmile
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
