import React, { useState } from "react";
// import { navigate } from "gatsby";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StaticImage } from "gatsby-plugin-image";
import CommentForm from "./CommentForm";

const Wrapper = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  border: 1px solid #dbdbdb;
  /* box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12) */
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: var(--spacing-medium);
`;

const Details = styled.div`
  span {
    display: flex;
    flex-direction: row;
    &:first-of-type {
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      svg {
        width: 12px;
        height: 12px;
        margin-left: var(--spacing-tiny);
      }
    }
    &:nth-of-type(2) {
      font-size: 12px;
    }
  }
  a {
    &:link,
    &:visited,
    &:active,
    &:hover {
      color: var(--color-black);
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-medium);
  svg {
    cursor: pointer;
    & + svg {
      margin-left: var(--spacing-medium);
    }
  }
`;

const Likes = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Caption = styled.div`
  font-size: 1.4rem;
  margin-bottom: var(--spacing-small);
  span {
    &:first-of-type {
      font-weight: 500;
    }
    &:nth-of-type(2) {
      margin-left: var(--spacing-small);
    }
  }
`;

const Comments = styled.div`
  font-size: 1.4rem;
  div {
    span {
      &:first-of-type {
        font-weight: 500;
      }
      &:nth-of-type(2) {
        margin-left: var(--spacing-small);
      }
    }
  }
`;

const Comment = styled.div`
  & + div {
    margin-top: var(--spacing-small);
    span:last-of-type span {
      color: var(--color-primary);
      font-weight: 400;
      cursor: pointer;
    }
  }
`;

const Footer = styled.footer`
  padding: var(--spacing-medium);
`;

export const InstagramCard = ({ className }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(87267);

  return (
    <Wrapper className={className}>
      <Header>
        <StaticImage
          src="../images/ezeikel.png"
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
            <a href="http://www.eggslut.com/" target="_blank" rel="noreferrer">
              Eggslut
            </a>
          </span>
        </Details>
      </Header>
      <section>
        <StaticImage
          src="../images/eggslut.jpg"
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
              onClick={() => {
                setLiked((liked) => !liked);
                if (liked) {
                  setLikes((likes) => likes - 1);
                } else {
                  setLikes((likes) => likes + 1);
                }
              }}
            />
            <FontAwesomeIcon
              icon={["fal", "comment"]}
              color="var(--color-black)"
              size="2x"
              // onClick={() => navigate("#contact")}
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
            onClick={() => setBookmarked((bookmarked) => !bookmarked)}
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
