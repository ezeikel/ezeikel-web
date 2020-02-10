import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 30px;
  color: var(--color-white);
  font-weight: 600;
  span {
    color: var(--color-primary);
  }
  a {
    color: var(--color-white);
  }
  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const StyledLink = styled(Link)`
  letter-spacing: 1px;
`;

const Logo = ({ className }) => (
  <Wrapper className={className}>
    <StyledLink to={"/"}>
      Ezeikel<span>.</span>
    </StyledLink>
  </Wrapper>
);

export default Logo;
