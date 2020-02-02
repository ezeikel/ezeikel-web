import React from "react";
import styled from "styled-components";
import QuarterCircle from "../images/quarter-circle.svg";
import Wave from "../images/wave.svg";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  img {
    position: absolute;
    max-width: 100%;
    &.quarter-circle {
      top: 0;
      left: 0;
      width: 430px;
      height: 320px;
    }
    &.wave {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`;

const Experience = () => (
  <Wrapper>
    <img className="quarter-circle" src={QuarterCircle} alt="quarter-circle" />
    <img className="wave" src={Wave} alt="wave" />
  </Wrapper>
);

export default Experience;