import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StaticImage } from "gatsby-plugin-image";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import classNames from "classnames";
import CommentForm from "../commentForm/commentForm";

const InstagramCard = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(87267);

  useEffect(() => {
    if (liked) {
      setLikes((currentlikes) => currentlikes - 1);
    } else {
      setLikes((currentlikes) => currentlikes + 1);
    }
  }, [liked]);

  const heartIconClass = classNames("cursor-pointer", {
    "text-red-500": liked,
    "text-black": !liked,
  });

  return (
    <div className="bg-white rounded border border-gray-200">
      <header className="flex items-center p-4">
        <StaticImage
          src="../../images/ezeikel.png"
          alt="avatar"
          placeholder="blurred"
          layout="fullWidth"
          objectFit="cover"
          objectPosition="center top"
          className="w-8 h-8 mr-2"
          imgStyle={{
            borderRadius: "50%",
          }}
        />
        <div>
          <span className="flex flex-row items-center font-medium text-sm">
            ezeikel
            <FontAwesomeIcon
              icon={["fas", "badge-check"]}
              size="sm"
              className="ml-1 text-navy-blue"
            />
          </span>
          <span className="flex flex-row text-xs">
            <OutboundLink
              href="http://www.eggslut.com/"
              target="_blank"
              rel="noreferrer"
              className="text-black leading-3"
            >
              Eggslut
            </OutboundLink>
          </span>
        </div>
      </header>
      <section>
        <StaticImage
          src="../../images/eggslut.jpg"
          alt="ezeikel"
          placeholder="blurred"
          layout="fullWidth"
          objectFit="cover"
          objectPosition="center top"
          className="max-h-60"
        />
      </section>
      <footer className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <FontAwesomeIcon
              icon={liked ? ["fas", "heart"] : ["fal", "heart"]}
              size="lg"
              onClick={() => setLiked((currentLiked) => !currentLiked)}
              className={heartIconClass}
            />
            <FontAwesomeIcon
              icon={["fal", "comment"]}
              size="lg"
              className="cursor-pointer ml-4 text-black"
            />
            <FontAwesomeIcon
              icon={["fal", "paper-plane"]}
              size="lg"
              className="cursor-pointer ml-4 text-black"
            />
          </div>
          <FontAwesomeIcon
            icon={bookmarked ? ["fas", "bookmark"] : ["fal", "bookmark"]}
            size="lg"
            onClick={() =>
              setBookmarked((currentBookmarked) => !currentBookmarked)
            }
            className="cursor-pointer text-black"
          />
        </div>
        <div>
          <div className="text-sm mb-2 font-medium">
            {likes.toLocaleString()} likes
          </div>
          <div className="text-sm mb-2">
            <span className="font-medium">ezeikel</span>
            <span className="ml-2">
              Literally the best Front End Developer ever.
            </span>
          </div>
          <div className="text-sm">
            <div>
              <span className="text-medium">apple</span>
              <span className="ml-2">We need to hire this guy!</span>
            </div>
            <div className="text-sm mt-2">
              <span className="text-medium">facebook</span>
              <span className="ml-2">
                Move over{" "}
                <span className="cursor-pointer font-normal text-navy-blue">
                  @apple
                </span>
              </span>
            </div>
          </div>
        </div>
      </footer>
      <CommentForm />
    </div>
  );
};

export default InstagramCard;
