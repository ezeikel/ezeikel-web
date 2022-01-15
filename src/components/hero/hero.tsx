import { OutboundLink } from "gatsby-plugin-google-gtag";
import InstagramCard from "../instagramCard/instagramCard";

const Hero = () => {
  return (
    <div className="flex flex-wrap -mt-16">
      <section className="mt-16 max-w-3xl flex-initial">
        <h1 className="text-8xl font-bold font-display text-navy-blue mb-8">
          Ezeikel.
        </h1>
        <h3 className="text-5xl mb-4 leading-[1.2] text-cornflower-blue">
          I love solving problems with code and building beautiful UIs.
        </h3>
        <h4 className="text-2xl mb-16 text-waterloo">
          Lead Web Engineer and JavaScript All-Rounder at{" "}
          <OutboundLink
            href="https://sparksapp.io"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Sparks
          </OutboundLink>
        </h4>
        <div className="flex flex-wrap -mt-8 -ml-8">
          <button
            type="button"
            className="flex flex-initial mt-8 ml-8 px-8 py-4 border-2 border-navy-blue rounded font-medium text-xl text-navy-blue"
          >
            See my work
          </button>
          <button
            type="button"
            className=" flex flex-initial mt-8 ml-8 px-8 py-4 border-2 border-navy-blue rounded font-medium text-xl text-white bg-navy-blue"
          >
            Hire me
          </button>
        </div>
      </section>
      <section className="mt-16 flex grow shrink-0 justify-center">
        <InstagramCard />
      </section>
    </div>
  );
};

export default Hero;
