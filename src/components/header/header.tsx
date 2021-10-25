import { Link } from "gatsby";
import { Wrapper, Nav } from "./header.styled";

const Header = () => (
  <Wrapper>
    <div>
      <Link to="/">Hello</Link>
    </div>
    <Nav>
      <ul>
        {/* <li>
          <Link to="/work">Work</Link>
        </li> */}
        {/* <li>
          <Link to="/about">About</Link>
        </li> */}
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        {/* <li>
          <Link to="/speaking">Speaking</Link>
        </li> */}
      </ul>
    </Nav>
  </Wrapper>
);

export default Header;
