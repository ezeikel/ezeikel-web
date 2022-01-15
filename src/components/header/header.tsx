import { Link } from "gatsby";

const Header = () => (
  <header className="flex justify-between items-center h-20 px-8 mb-16">
    <div>
      <Link to="/" className="text-xl text-waterloo">
        Hello
      </Link>
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/blog" className="text-xl text-waterloo">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
