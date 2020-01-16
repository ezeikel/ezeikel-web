import React from "react";
import styled from "styled-components";
import SocialLinks from "./socialLinks";
import UserCard from "./userCard";
import Ezeikel from "../images/ezeikel.png"
import Kanye from "../images/kanye.png"
import Nipsey from "../images/nipsey.png"

const users = [
  {
    name: "Ezeikel Pemberton" ,
    avatar: Ezeikel,
    handle: "ezeikel_",
    link: "https://twitter.com/ezeikel_",
    copy: "Experienced Software Engineer and Computer Science graduate with 5+ years of experience working as a Front End and Full Stack JavaScript Developer at Digital Agencies and Startups.",
    order: "top"
  },
  {
    name: "Kanye West" ,
    avatar: Kanye,
    handle: "kanyewest",
    link: "https://twitter.com/kanyewest",
    copy: "I drink a boost for breakfast, and ensure for dessert. Somebody ordered pancakes I just sip the sizzurp. That right there could drive a sane man bizzerk. Not to worry Mr. H 2 the Izzo’s back to wizzerk.",
    order: "middle"
  },
  {
    name: "Nipsey Hussle" ,
    avatar: Nipsey,
    handle: "nipseyhussle",
    link: "https://twitter.com/nipseyhussle",
    copy: "The most important thing, number one, is you gotta get rid of doubt. If you got doubt in what you’re doing, it’s not gonna work and the way to do that is you have a plan.",
    order: "bottom"
  }
];

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  background-image: linear-gradient(to bottom, #1E3C72, #2A5298);
  position: relative;
  min-height: 50vh;
  padding: 50px;
  padding-top: 180px;
`;

const Headline = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 1 0 50%;
  height: 100%;
  h2 {
    font-size: 48px;
    line-height: 60px;
    color: #2DE1C2;
    font-weight: 300;
    margin: 0;
  }
  h1 {
    font-size: 72px;
    line-height: 90px;
    color: var(--color-white);
    margin: 0 0 8px 0;
    span {
      color: #2DE1C2;
    }
  }
  p {
    margin: 0 0 32px 0;
    font-size: 30px;
    color: var(--color-white);
    font-weight: 300;
  }
`;

const StyledButton = styled.button`
  background-color: #FF595E;
  color: var(--color-white);
  border-radius: 4px;
  padding: 16px;
  width: 180px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: var(--box-shadow);
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 0 50%;
`;

const Cards = styled.div`
  > div {
    position: relative;
    &.top {
      transform: translateY(100%);
      z-index: 4;
    }
    &.middle {
      transform: translate(-20%, -35%);
      z-index: 3;
    }
    &.bottom {
      transform: translate(-15%, -55%);
      z-index: 2;
    }
  }
`;

const StyledSocialLinks = styled(SocialLinks)`
    margin-top: auto;
`;

const Hero = () => (
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

export default Hero;