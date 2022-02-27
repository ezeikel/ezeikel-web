import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostPreview = ({ post }: { post: any }) => (
  <div className="flex flex-col p-4">
    <h4 className="font-medium mb-2 text-navy-blue text-3xl font-display">
      {post.title}
    </h4>
    <p className="text-xl font-normal mb-4 text-waterloo">{post.excerpt}</p>
    <div>
      <Link to={`/blog/${post.slug}`} className="flex items-center">
        <span className="text-xl font-normal mr-2 text-navy-blue">Read</span>
        <FontAwesomeIcon
          icon={["far", "long-arrow-right"]}
          size="lg"
          className="text-navy-blue"
        />
      </Link>
    </div>
  </div>
);

export default PostPreview;
