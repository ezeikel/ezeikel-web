import Link from 'next/link';

const Header = () => (
  <header className="flex justify-between items-center p-8">
    <Link href="/" className="text-xl text-waterloo">
      Hello
    </Link>
    <nav className="flex space-x-8">
      <Link href="/blog">Blog</Link>
      <Link href="/about">About</Link>
      <Link href="/uses">Uses</Link>
    </nav>
  </header>
);

export default Header;
