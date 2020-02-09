import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    min-height: 50vh;
  }
`;

const Alpha = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  color: var(--color-black);
  padding: 32px;
`;

const Beta = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #00E3C2;
  color: var(--color-white);
  padding: 32px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 16px 0;
`;

const Copy = styled.p`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  margin: 0;
  text-align: left;
`;

const Background = () => (
  <Wrapper>
    <Alpha>
      <Title>The World Wide Web</Title>
      <Copy>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no</Copy>
    </Alpha>
    <Beta>
      <Title>Startups &amp; Agencies</Title>
      <Copy>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no</Copy>
    </Beta>
  </Wrapper>
);

export default Background;