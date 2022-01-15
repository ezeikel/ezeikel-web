import SubscribeForm from "../subscribeForm/subscribeForm";
import SocialLinks from "../socialLinks/socialLinks";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-[#333333] p-8 text-white mt-16">
      <h1 className="font-display text-white text-5xl font-bold mb-8 md:mb-4 md:text-left">
        Ezeikel.
      </h1>
      <SubscribeForm />
      <section className="flex flex-col items-start mb-8">
        <SocialLinks />
      </section>
      <section className="flex justify-between text-base">
        <div>&copy; {new Date().getFullYear()} Ezeikel.</div>
        <div>
          Made with <span className="text-red-600">♡</span> in South London.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
