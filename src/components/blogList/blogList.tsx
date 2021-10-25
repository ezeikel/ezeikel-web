import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Wrapper, ImageWrapper } from "./blogList.styled";

const BlogList = ({ posts }) => {
  return (
    <Wrapper>
      {posts.map((post) => (
        <li>
          <Link to={post.slug}>
            <ImageWrapper>
              <GatsbyImage
                image={post.heroImage}
                alt="hero image"
                placeholder="blurred"
                layout="fullWidth"
                objectFit="cover"
                objectPosition="center top"
              />
            </ImageWrapper>
            <div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </Wrapper>
  );
};

export default BlogList;
