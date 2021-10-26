import { Link } from "gatsby";
import useLatesPosts from "../../hooks/useLatestPosts";
import PostPreview from "../postPreview/postPreview";
import { Wrapper, Title } from "./latestPosts.styled";

const LatestPosts = () => {
  const posts = useLatesPosts();

  return (
    <Wrapper>
      <Title>Posts</Title>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
      <Link to="/blog">All posts</Link>
    </Wrapper>
  );
};

export default LatestPosts;
