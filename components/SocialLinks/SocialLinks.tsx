import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faInstagram,
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const SOCIAL_LINKS = [
  {
    href: 'https://twitter.com/ezeikel_',
    icon: faTwitter,
  },
  {
    href: 'https://www.youtube.com/@ezeikel',
    icon: faYoutube,
  },
  {
    href: 'https://www.instagram.com/ezeikel_',
    icon: faInstagram,
  },
  {
    href: 'https://www.linkedin.com/in/ezeikel-pemberton-5bb53728/',
    icon: faLinkedinIn,
  },
  {
    href: 'https://github.com/ezeikel',
    icon: faGithub,
  },
];

const SocialLinks = () => (
  <ul className="flex justify-center space-x-8">
    {SOCIAL_LINKS.map(({ href, icon }) => (
      <li key={href}>
        <Link href={href} target="_blank">
          <FontAwesomeIcon
            icon={icon}
            color="#9B9B9B"
            className="cursor-pointer text-[#9B9B9B] hover:text-white transition-colors duration-300 ease-in-out"
            size="2x"
          />
        </Link>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
