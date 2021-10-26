import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StaticImage } from "gatsby-plugin-image";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import CommentForm from "../commentForm/commentForm";
import {
  Wrapper,
  Header,
  Details,
  Actions,
  Likes,
  Caption,
  Comments,
  Comment,
  Footer,
} from "./instagramCard.styled";

const InstagramCard = ({ className }) => {
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

  return (
    <Wrapper className={className}>
      <Header>
        <StaticImage
          src="../../images/ezeikel.png"
          alt="avatar"
          placeholder="blurred"
          layout="fullWidth"
          objectFit="cover"
          objectPosition="center top"
          style={{
            width: "32px",
            height: "32px",
            marginRight: "var(--spacing-small)",
          }}
          imgStyle={{
            borderRadius: "50%",
          }}
        />
        <Details>
          <span>
            ezeikel
            <FontAwesomeIcon
              icon={["fas", "badge-check"]}
              color="var(--color-primary)"
              size="5x"
            />
          </span>
          <span>
            <OutboundLink
              href="http://www.eggslut.com/"
              target="_blank"
              rel="noreferrer"
            >
              Eggslut
            </OutboundLink>
          </span>
        </Details>
      </Header>
      <section>
        <StaticImage
          src="../../images/eggslut.jpg"
          alt="ezeikel"
          placeholder="blurred"
          layout="fullWidth"
          objectFit="cover"
          objectPosition="center top"
          style={{
            maxHeight: "250px",
          }}
        />
      </section>
      <Footer>
        <Actions>
          <div>
            <FontAwesomeIcon
              icon={liked ? ["fas", "heart"] : ["fal", "heart"]}
              color={`var(--color-${liked ? "like" : "black"})`}
              size="2x"
              onClick={() => setLiked((currentLiked) => !currentLiked)}
            />
            <FontAwesomeIcon
              icon={["fal", "comment"]}
              color="var(--color-black)"
              size="2x"
            />
            <FontAwesomeIcon
              icon={["fal", "paper-plane"]}
              color="var(--color-black)"
              size="2x"
            />
          </div>
          <FontAwesomeIcon
            icon={bookmarked ? ["fas", "bookmark"] : ["fal", "bookmark"]}
            color="var(--color-black)"
            size="2x"
            onClick={() =>
              setBookmarked((currentBookmarked) => !currentBookmarked)
            }
          />
        </Actions>
        <div>
          <Likes>{likes.toLocaleString()} likes</Likes>
          <Caption>
            <span>ezeikel</span>
            <span>Literally the best Front End Developer ever.</span>
          </Caption>
          <Comments>
            <Comment>
              <span>apple</span>
              <span>We need to hire this guy!</span>
            </Comment>
            <Comment>
              <span>facebook</span>
              <span>
                Move over <span>@apple</span>
              </span>
            </Comment>
          </Comments>
        </div>
      </Footer>
      <CommentForm />
    </Wrapper>
  );
};

export default InstagramCard;
