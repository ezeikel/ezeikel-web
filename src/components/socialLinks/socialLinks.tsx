import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const SocialLinks = () => {
  return (
    <ul className="flex justify-center space-x-8">
      <li>
        <OutboundLink href="https://twitter.com/ezeikel_" target="_blank">
          <FontAwesomeIcon
            icon={["fab", "twitter"]}
            color="#9B9B9B"
            fill="red"
            size="2x"
          />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink
          href="https://www.youtube.com/channel/UCOLX7OP--O7XnLS9Vpvr76g"
          target="_blank"
        >
          <FontAwesomeIcon
            icon={["fab", "youtube"]}
            color="#9B9B9B"
            size="2x"
          />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://www.instagram.com/ezeikel_" target="_blank">
          <FontAwesomeIcon
            icon={["fab", "instagram"]}
            color="#9B9B9B"
            size="2x"
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
            color="#9B9B9B"
            size="2x"
          />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://github.com/ezeikel" target="_blank">
          <FontAwesomeIcon icon={["fab", "github"]} color="#9B9B9B" size="2x" />
        </OutboundLink>
      </li>
    </ul>
  );
};

export default SocialLinks;
