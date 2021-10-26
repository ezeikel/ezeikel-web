import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { Wrapper } from "./socialLinks.styled";

const SocialLinks = ({ className, size, fill }) => {
  return (
    <Wrapper className={className}>
      <li>
        <OutboundLink href="https://twitter.com/ezeikel_" target="_blank">
          <FontAwesomeIcon icon={["fab", "twitter"]} color={fill} size={size} />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink
          href="https://www.youtube.com/channel/UCOLX7OP--O7XnLS9Vpvr76g"
          target="_blank"
        >
          <FontAwesomeIcon icon={["fab", "youtube"]} color={fill} size={size} />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://www.instagram.com/ezeikel_" target="_blank">
          <FontAwesomeIcon
            icon={["fab", "instagram"]}
            color={fill}
            size={size}
          />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink
          href="https://www.linkedin.com/in/ezeikel-pemberton-5bb53728/"
          target="_blank"
        >
          <FontAwesomeIcon
            icon={["fab", "linkedin-in"]}
            color={fill}
            size={size}
          />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://github.com/ezeikel" target="_blank">
          <FontAwesomeIcon icon={["fab", "github"]} color={fill} size={size} />
        </OutboundLink>
      </li>
    </Wrapper>
  );
};

export default SocialLinks;
