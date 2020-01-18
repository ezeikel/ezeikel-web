import React from "react";
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components";
import SocialLinks from "./socialLinks";
import UserCard from "./userCard";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #1e3c72, #2a5298);
  padding: var(--header-height) var(--spacing-large) var(--spacing-large)
    var(--spacing-large);
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const Headline = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  height: 100%;
  margin-bottom: 192px;
  h2 {
    font-size: 36px;
    color: #2de1c2;
    font-weight: 300;
    margin: 0;
    text-align: center;
  }
  h1 {
    font-size: 48px;
    line-height: 1;
    color: var(--color-white);
    margin: 0 0 16px 0;
    text-align: center;
    span {
      color: #2de1c2;
    }
  }
  p {
    margin: 0 0 32px 0;
    font-size: 20px;
    line-height: 1.5;
    color: var(--color-white);
    font-weight: 300;
    text-align: center;
  }
  @media (min-width: 768px) {
    flex: 1 0 50%;
    margin-bottom: 0;
    padding-right: var(--spacing-large);
    h2 {
      font-size: 48px;
      line-height: 60px;
      text-align: left;
    }
    h1 {
      font-size: 72px;
      margin: 0 0 8px 0;
      text-align: left;
    }
    p {
      font-size: 30px;
      line-height: 38px;
      text-align: left;
    }
  }
`

const StyledButton = styled.button`
  background-color: #ff595e;
  color: var(--color-white);
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  box-shadow: var(--box-shadow);

  @media (min-width: 768px) {
    width: 180px;
  }
`;

const CardsWrapper = styled.div`
  flex: 0 0 50%;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    position: relative;
    &.top {
      z-index: 4;
    }
    &.middle {
      transform: translate(-22%, -120%);
      z-index: 3;
    }
    &.bottom {
      transform: translate(22%, -190%);
      z-index: 2;
    }
  }
  @media (min-width: 768px) {
    > div {
      &.top {
        transform: translateY(50%);
      }
      &.middle {
        transform: translate(-15%, -70%);
      }
      &.bottom {
        transform: translate(-23%, -115%);
      }
    }
  }
`

const StyledSocialLinks = styled(SocialLinks)`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    margin-top: auto;
  }
`;

const Hero = ({ data }) => {
  const users = [
    {
      name: "Ezeikel Pemberton",
      avatar: data.ezeikelImage.childImageSharp.fluid,
      handle: "ezeikel_",
      link: "https://twitter.com/ezeikel_",
      copy:
        "Experienced Software Engineer and Computer Science graduate with 5+ years of experience working as a Front End and Full Stack JavaScript Developer at Digital Agencies and Startups.",
      order: "top",
    },
    {
      name: "Kanye West",
      avatar: data.kanyeImage.childImageSharp.fluid,
      handle: "kanyewest",
      link: "https://twitter.com/kanyewest",
      copy:
        "I drink a boost for breakfast, and ensure for dessert. Somebody ordered pancakes I just sip the sizzurp. That right there could drive a sane man bizzerk. Not to worry Mr. H 2 the Izzo’s back to wizzerk.",
      order: "middle",
    },
    {
      name: "Nipsey Hussle",
      avatar: data.nipseyImage.childImageSharp.fluid,
      handle: "nipseyhussle",
      link: "https://twitter.com/nipseyhussle",
      copy:
        "The most important thing, number one, is you gotta get rid of doubt. If you got doubt in what you’re doing, it’s not gonna work and the way to do that is you have a plan.",
      order: "bottom",
    },
  ]

  return (
    <Wrapper>
      <Headline>
        <h2>Freelance</h2>
        <h1>Front End Developer<span>.</span></h1>
        <p>I love solving problems with JavaScript and building beautiful UIs.</p>
        <StyledButton>Hire me</StyledButton>
        <StyledSocialLinks />
      </Headline>
      <CardsWrapper>
        <Cards>
          {
            users.map((user, i) => (
              <UserCard {...user} key={i} />
            ))
          }
        </Cards>
      </CardsWrapper>
    </Wrapper>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        ezeikelImage: file(relativePath: { eq: "ezeikel.png" }) {
          childImageSharp {
            fluid(maxWidth: 150, maxHeight: 150, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        kanyeImage: file(relativePath: { eq: "kanye.png" }) {
          childImageSharp {
            fluid(maxWidth: 150, maxHeight: 150, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        nipseyImage: file(relativePath: { eq: "nipsey.png" }) {
          childImageSharp {
            fluid(maxWidth: 150, maxHeight: 150, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Hero data={data} {...props} />}
  />
)