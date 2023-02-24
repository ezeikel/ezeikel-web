import SubscribeForm from '../forms/SubscribeForm/SubscribeForm';
import SocialLinks from '../SocialLinks/SocialLinks';

const Footer = () => (
  <footer className="flex flex-col bg-[#333333] p-8 text-white">
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

export default Footer;
