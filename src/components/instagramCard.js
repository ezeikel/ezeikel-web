import React, { useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  background-color: var(--color-white);
  border-radius: 4px;
  box-shadow: 0 3px 6px #2de1c2;
  @media (min-width: 768px) {
    box-shadow: none;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 3px 6px #2de1c2;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const Avatar = styled(Img)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 4px;
`;

const Details = styled.section`
  span {
    display: flex;
    flex-direction: row;
    &:first-of-type {
      font-size: 14px;
      font-weight: 600;
      display: flex;
      svg {
        width: 12px;
        height: 12px;
        margin-left: 4px;
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

const Content = styled.section`
  @media (min-width: 1024px) {
    width: 400px;
    height: 300px;
  }
`;

const Actions = styled.section`
  padding: 16px;
  svg {
    cursor: pointer;
    & + svg {
      margin-left: 16px;
    }
  }
`;

const Interactions = styled.section`
  padding: 16px;
`;

const Likes = styled.section`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Caption = styled.section`
  font-size: 14px;
  margin-bottom: 8px;
  span {
    &:first-of-type {
      font-weight: 700;
    }
    &:nth-of-type(2) {
      margin-left: 8px;
    }
  }
`;

const Comments = styled.section`
  font-size: 14px;
  div {
    span {
      &:first-of-type {
        font-weight: 700;
      }
      &:nth-of-type(2) {
        margin-left: 8px;
      }
    }
  }
`;

const Comment = styled.div`
  & + div {
    margin-top: 8px;
    span:last-of-type span {
      color: var(--color-primary);
      font-weight: 400;
      cursor: pointer;
    }
  }
`;

export const InstagramCard = ({ data, className }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(87267);

  return (
    <Wrapper className={className}>
      <Header>
        <Avatar
          fluid={data.avatarImage.childImageSharp.fluid}
          imgStyle={{
            "object-fit": "cover",
            "object-position": "center top"
          }}
          alt="avatar"
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
            <a href="http://www.eggslut.com/">Eggslut</a>
          </span>
        </Details>
      </Header>
      <Content>
        <Img
          fixed={data.contentImage.childImageSharp.fixed}
          imgStyle={{
            "object-fit": "cover",
            "object-position": "center top",
            "max-height": "100%",
            "width": "100%"
          }}
          style={{
            width: "100%",
            "max-height": "100%"
          }}
          alt="eggslut"
        />
      </Content>
      <Actions>
        <FontAwesomeIcon
          icon={liked ? ["fas", "heart"] : ["fal", "heart"]}
          color={`var(--color-${liked ? "like" : "black"})`}
          size="3x"
          onClick={() => {
            setLiked(!liked);
            if (liked) {
              setLikes(likes - 1);
            } else {
              setLikes(likes + 1);
            }
          }}
        />
        <FontAwesomeIcon
          icon={["fal", "comment"]}
          color="var(--color-black)"
          size="3x"
          onClick={() => navigate("#contact")}
        />
        <FontAwesomeIcon
          icon={["fal", "paper-plane"]}
          color="var(--color-black)"
          size="3x"
        />
      </Actions>
      <Interactions>
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
      </Interactions>
    </Wrapper>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        avatarImage: file(relativePath: { eq: "ezeikel.png" }) {
          childImageSharp {
            fluid(maxHeight: 36, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        contentImage: file(relativePath: { eq: "eggslut.jpg" }) {
          childImageSharp {
            fixed(height: 300, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <InstagramCard data={data} {...props} />}
  />
);
