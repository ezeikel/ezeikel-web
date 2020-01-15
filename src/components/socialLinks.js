import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.ul`
  display: flex;
  li + li {
    margin-left: 32px;
  }
`;

const SocialLinks = () => {
  return (
    <Wrapper>
      <li>
        <a href="https://twitter.com/118eighty8">
          <FontAwesomeIcon
            icon={["fab", "twitter"]}
            color="var(--color-white)"
            size="4x"
          />
        </a>
      </li>
      <li>
        <a href="https://fb.me/118eighty8">
          <FontAwesomeIcon
            icon={["fab", "github"]}
            color="var(--color-white)"
            size="4x"
          />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/company/eleven-8eighty8">
          <FontAwesomeIcon
            icon={["fab", "linkedin-in"]}
            color="var(--color-white)"
            size="4x"
          />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/118eighty8">
          <FontAwesomeIcon
            icon={["fab", "instagram"]}
            color="var(--color-white)"
            size="4x"
          />
        </a>
      </li>
    </Wrapper>
  );
};

export default SocialLinks;