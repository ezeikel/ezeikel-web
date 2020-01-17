import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #394f76;
  color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 32px;
  max-width: 75%;
  min-height: 50%;
  margin: 0 auto;
  @media (min-width: 768px) {
    max-width: 700px;
  }
`

const Top = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    align-items: initial;
    flex-direction: row;
    margin-bottom: 32px;
  }
`;

const Bottom = styled.section`
  display: flex;
  p {
    font-size: 16px;
    line-height: 20px;
    font-weight: 300;
    margin: 0;
    @media (min-width: 768px) {
      font-size: 18px;
      line-height: 27px;
    }
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border: 4px solid var(--color-white);
  border-radius: 100%;
  overflow: hidden;
  margin-bottom: 8px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 20%;
  }
  @media (min-width: 768px) {
    margin-right: 16px;
    margin-bottom: 0;
    border: 8px solid var(--color-white);
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:first-of-type {
      font-size: 18px;
      line-height: 22px;
      font-weight: bold;
      text-align: center;
    }
    &:nth-of-type(2) {
      font-size: 16px;
      line-height: 20px;
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
        line-height: 54px;
        text-align: left;
      }
      &:nth-of-type(2) {
        font-size: 30px;
        line-height: 38px;
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
          <img src={avatar} alt="avatar" />
        </Avatar>
        <Details>
          <span>{name}</span>
          <span><a href={link}>@{handle}</a></span>
        </Details>
      </Top>
      <Bottom>
        <p>{copy}</p>
      </Bottom>
    </Wrapper>
  );
};

export default UserCard;