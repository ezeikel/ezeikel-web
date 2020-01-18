import React from "react";
import Img from "gatsby-image/withIEPolyfill"
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #394f76;
  color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-medium);
  width: 300px;
  height: 300px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: var(--spacing-large);
    min-width: 75%;
    min-height: 300px;
    max-width: auto;
    height: auto;
  }
`;

const Top = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1270px) {
    flex-direction: row;
    margin-bottom: var(--spacing-medium);
  }
`;

const Bottom = styled.section`
  display: flex;
  p {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 300;
    margin: 0;
    text-align: center;
    @media (min-width: 768px) {
      font-size: 20px;
      line-height: 1.5;
    }
    @media (min-width: 1270px) {
      text-align: left;
    }
  }
`;

const Avatar = styled.div`
  flex: 0 0 64px;
  width: 64px;
  height: 64px;
  border: 4px solid var(--color-white);
  border-radius: 100%;
  overflow: hidden;
  margin-bottom: 8px;
  @media (min-width: 768px) {
    flex: 0 0 150px;
    width: 150px;
    height: 150px;
    margin-right: 16px;
    margin-bottom: 0;
    border-width: 8px;
  }
`;

const Details = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  span {
    &:first-of-type {
      font-size: 18px;
      line-height: 1.5;
      font-weight: bold;
      text-align: center;
    }
    &:nth-of-type(2) {
      font-size: 16px;
      line-height: 1.5;
      font-weight: 300;
      text-align: center;
      margin-bottom: 8px;
      a {
        color: #2de1c2;
      }
    }
  }
  @media (min-width: 768px) {
    span {
      &:first-of-type {
        font-size: 36px;
        line-height: 1.2;
      }
      &:nth-of-type(2) {
        font-size: 30px;
      }
    }
  }
  @media (min-width: 1270px) {
    span {
      &:first-of-type {
        text-align: left;
      }
      &:nth-of-type(2) {
        text-align: left;
        margin-bottom: 0;
      }
    }
    }
`;

const UserCard = ({ avatar, name, handle, link, copy, order }) => {
  return (
    <Wrapper className={order}>
      <Top>
        <Avatar>
          <Img
            fluid={avatar}
            objectFit="cover"
            objectPosition="50% 20%"
            alt={`${name.toLowerCase().replace(/\s/g, '-')}-avatar`}
          />
        </Avatar>
        <Details>
          <span>{name}</span>
          <span>
            <a href={link}>@{handle}</a>
          </span>
        </Details>
      </Top>
      <Bottom>
        <p>{copy}</p>
      </Bottom>
    </Wrapper>
  )
};

export default UserCard;