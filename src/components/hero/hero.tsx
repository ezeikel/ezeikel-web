import { OutboundLink } from "gatsby-plugin-google-gtag";
import Button from "../button/button";
import InstagramCard from "../instagramCard";
import { Wrapper, ButtonsWrapper } from "./hero.styled";

const Hero = () => {
  return (
    <Wrapper>
      <section>
        <h1>Ezeikel.</h1>
        <h3>I love solving problems with code and building beautiful UIs.</h3>
        <h4>
          Lead Web Engineer and JavaScript All-Rounder at{" "}
          <OutboundLink
            href="https://sparksapp.io"
            target="_blank"
            rel="noreferrer"
          >
            Sparks
          </OutboundLink>
        </h4>
        <ButtonsWrapper>
          <Button title="See my work" variant="outline" />
          <Button title="Hire me" />
        </ButtonsWrapper>
      </section>
      <section>
        <InstagramCard />
      </section>
    </Wrapper>
  );
};

export default Hero;
