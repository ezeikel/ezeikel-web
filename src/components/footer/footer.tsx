import SubscribeForm from "../subscribeForm/subscribeForm";
import SocialLinks from "../socialLinks/socialLinks";
import { Wrapper, Follow, Copyright } from "./footer.styled";

const Footer = () => {
  return (
    <Wrapper>
      <h1>Ezeikel.</h1>
      <SubscribeForm />
      <Follow>
        <SocialLinks size="3x" fill="#9B9B9B" />
      </Follow>
      <Copyright>
        <div>&copy; {new Date().getFullYear()} Ezeikel.</div>
        <div>
          Made with <span>♡</span> in South London.
        </div>
      </Copyright>
    </Wrapper>
  );
};

export default Footer;
