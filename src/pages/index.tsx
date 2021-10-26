import Layout from "../components/layout/layout";
import Hero from "../components/hero/hero";
import LatestPosts from "../components/latestPosts/latestPosts";
import Contact from "../components/contact/contact";

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
