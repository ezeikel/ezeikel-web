import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
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
} from "@fortawesome/pro-regular-svg-icons";
import GlobalStyle from "../GlobalStyle";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Hero from "../components/hero";
import ArticlePreview from "../components/article-preview";

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

const IndexPage = (props) => {
  const posts = get(props, "data.allContentfulBlogPost.edges");

  return (
    <Layout>
      <SEO title="Home" />
      <GlobalStyle />
      <Hero />
      <ul className="article-list">
        {posts.map(({ node }) => {
          return (
            <li key={node.slug}>
              <ArticlePreview article={node} />
            </li>
          );
        })}
      </ul>
      {/* <Contact />
    <Footer /> */}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
