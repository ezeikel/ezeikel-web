import React, { useState } from "react";
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
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    &:nth-of-type(2) {
      width: 15px;
    }
  }
  ${({ active }) => {
    return active
      ? `
      > span:nth-child(1) {
        transform: translateY(12px) rotate(45deg);
        background-color: var(--color-black);
      }
      > span:nth-child(2) {
        opacity: 0;
      }
      > span:nth-child(3) {
        transform: translateY(-12px) rotate(-45deg);
        background-color: var(--color-black);
      }
    `
      : "";
  }};
`;

const Hamburger = () => {
  const [active, setActive] = useState(false);

  return (
    <Wrapper onClick={() => setActive(!active)} active={active}>
      <span></span>
      <span></span>
      <span></span>
    </Wrapper>
  );
};

export default Hamburger;