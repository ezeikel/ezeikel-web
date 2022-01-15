import { Link } from "gatsby";
import useLatesPosts from "../../hooks/useLatestPosts";
import PostPreview from "../postPreview/postPreview";

const LatestPosts = () => {
  const posts = useLatesPosts();

  return (
    <div className="flex flex-col">
      <h2 className="font-display font-bold text-7xl text-navy-blue mb-16">
        Posts
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-16">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
      <Link
        to="/blog"
        className="text-xl font-display font-bold text-navy-blue underline"
      >
        All posts
      </Link>
    </div>
  );
};

export default LatestPosts;
