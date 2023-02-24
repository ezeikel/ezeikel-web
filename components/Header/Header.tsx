import Link from 'next/link';

const Header = () => (
  <header className="flex justify-between items-center p-8">
    <div>
      <Link href="/" className="text-xl text-waterloo">
        Hello
      </Link>
    </div>
  </header>
);

export default Header;
