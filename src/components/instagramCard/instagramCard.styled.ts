import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  border: 1px solid #dbdbdb;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: var(--spacing-medium);
`;

export const Details = styled.div`
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

export const Actions = styled.div`
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

export const Likes = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 12px;
`;

export const Caption = styled.div`
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

export const Comments = styled.div`
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

export const Comment = styled.div`
  & + div {
    margin-top: var(--spacing-small);
    span:last-of-type span {
      color: var(--color-primary);
      font-weight: 400;
      cursor: pointer;
    }
  }
`;

export const Footer = styled.footer`
  padding: var(--spacing-medium);
`;
