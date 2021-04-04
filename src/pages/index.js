import React from "react";
import Layout from "../components/layout";
import Hero from "../components/hero";
import LatestPosts from "../components/latestPosts";
import Contact from "../components/contact";

const IndexPage = () => {
  return (
    <Layout pageTitle="">
      <Hero />
      <LatestPosts />
      <Contact />
    </Layout>
  );
};

export default IndexPage;
