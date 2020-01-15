import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";
import Hero from "../components/hero";

const Wrapper = styled.div`
  display: grid;
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GlobalStyle />
    <Wrapper>
      <Hero />
    </Wrapper>
  </Layout>
);

export default IndexPage;
