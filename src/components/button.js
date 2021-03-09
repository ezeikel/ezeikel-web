import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  border: none;
  cursor: pointer;
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  color: var(--color-white);
  padding: var(--spacing-medium) var(--spacing-large);
  font-size: 2rem;
  font-weight: 500;
`;

const Button = ({ title }) => (
  <Wrapper>
    {title}
  </Wrapper>
);

export default Button;