import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  z-index: 1;
  > span {
    flex: 0 0 auto;
    display: block;
    border-radius: var(--border-radius);
    width: 24px;
    height: 4px;
    background-color: var(--color-primary);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    &:nth-of-type(2) {
      width: 12px;
    }
    + span {
      margin-top: var(--spacing-small);
    }
  }
  ${({ active }) => {
    return active
      ? `
      > span:nth-child(1) {
        transform: translateY(12px) rotate(45deg);
        background-color: var(--color-white);
      }
      > span:nth-child(2) {
        opacity: 0;
      }
      > span:nth-child(3) {
        transform: translateY(-12px) rotate(-45deg);
        background-color: var(--color-white);
      }
    `
      : "";
  }};
  @media (min-width: 768px) {
    > span {
      height: 4px;
      width: 30px;
      &:nth-of-type(2) {
        width: 15px;
      }
      + span {
        margin-top: var(--spacing-small);
      }
    }
    ${({ active }) => {
      return active
        ? `
      > span:nth-child(1) {
        transform: translateY(12px) rotate(45deg);
      }
      > span:nth-child(3) {
        transform: translateY(-12px) rotate(-45deg);
      }
    `
        : "";
    }};
  }
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
