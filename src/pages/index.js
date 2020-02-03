import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import Hero from "../components/hero";
import Layout from "../components/layout";
import SEO from "../components/seo";
import GlobalStyle from "../GlobalStyle";
import {
  far,
  faTablet,
  faBrowser,
  faMobile,
  faMapMarkedAlt,
  faFillDrip,
  faPaperPlane,
} from "@fortawesome/pro-regular-svg-icons";

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
);

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GlobalStyle />
    <Hero />
  </Layout>
);

export default IndexPage;
