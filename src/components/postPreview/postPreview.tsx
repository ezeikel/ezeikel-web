import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper, Title, Excerpt, ReadMore } from "./postPreview.styled";

const PostPreview = ({ post }) => (
  <Wrapper>
    <Title>{post.title}</Title>
    <Excerpt>{post.excerpt}</Excerpt>
    <ReadMore>
      <Link to={`/blog/${post.slug}`}>
        <span>Read</span>
        <FontAwesomeIcon
          icon={["far", "long-arrow-right"]}
          color="var(--color-primary)"
          size="2x"
        />
      </Link>
    </ReadMore>
  </Wrapper>
);

export default PostPreview;
