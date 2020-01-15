import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  z-index: 1;
  > span {
    display: block;
    border-radius: 4px;
    margin-top: 8px;
    margin-bottom: 8px;
    width: 30px;
    height: 4px;
    background-color: #2DE1C2;
    justify-content: flex-start;
    text-align: left;
    &:nth-of-type(2) {
      width: 15px;
    }
  }
`;

const Hamburger = () => (
  <Wrapper>
    <span></span>
    <span></span>
    <span></span>
  </Wrapper>
);

export default Hamburger;