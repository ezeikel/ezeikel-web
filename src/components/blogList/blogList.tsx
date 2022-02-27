import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const BlogList = ({ posts }: { posts: any }) => (
  <ul className="flex flex-wrap gap-8">
    {posts.map((post: any) => (
      <li className="basis-80 flex-1 flex-shrink-0 p-8 border border-gray-100 rounded">
        <Link to={post.slug}>
          <div className="mb-4">
            <GatsbyImage
              image={post.heroImage}
              alt="hero image"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h3 className="font-display text-3xl font-bold text-navy-blue mb-2">
              {post.title}
            </h3>
            <p className="text-xl m-0 font-normal text-waterloo">
              {post.description}
            </p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

export default BlogList;
