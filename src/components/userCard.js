import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #394F76;
  color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 32px;
  max-width: 700px;
`;

const Top = styled.section`
  display: flex;
  margin-bottom: 32px;
`;

const Bottom = styled.section`
  display: flex;
  p {
    font-size: 18px;
    line-height: 27px;
    font-weight: 300;
    margin: 0;
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border: 8px solid var(--color-white);
  border-radius: 100%;
  margin-right: 16px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 20%;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:first-of-type {
      font-size: 36px;
      line-height: 54px;
      font-weight: bold;
    }
    &:nth-of-type(2) {
      font-size: 30px;
      line-height: 38px;
      font-weight: 300;
      a {
        color: #2DE1C2;
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