import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/constants';

const Header = () => (
  <header className="flex justify-between items-center p-8" id="header">
    <Link href="/" className="text-xl text-waterloo">
      Hello
    </Link>
    <nav className="flex space-x-8">
      {NAVIGATION_LINKS.map((link) => (
        <Link key={link.id} href={link.href}>
          {link.name}
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;
