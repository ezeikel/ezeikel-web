import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  li {
    svg path {
      transition: fill 0.3s ease-in-out;
    }
    @media (min-width: 768px) {
      &:hover {
        svg path {
          fill: var(--color-white);
        }
      }
    }
  }
  li + li {
    margin-left: var(--spacing-large);
  }
`;

const SocialLinks = ({ className, size, fill }) => {
  return (
    <Wrapper className={className}>
      <li>
        <OutboundLink href="https://twitter.com/ezeikel_">
          <FontAwesomeIcon icon={["fab", "twitter"]} color={fill} size={size} />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://github.com/ezeikel">
          <FontAwesomeIcon icon={["fab", "github"]} color={fill} size={size} />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://www.linkedin.com/in/ezeikel-pemberton-5bb53728/">
          <FontAwesomeIcon
            icon={["fab", "linkedin-in"]}
            color={fill}
            size={size}
          />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://www.instagram.com/ezeikel_">
          <FontAwesomeIcon
            icon={["fab", "instagram"]}
            color={fill}
            size={size}
          />
        </OutboundLink>
      </li>
    </Wrapper>
  );
};

export default SocialLinks;
