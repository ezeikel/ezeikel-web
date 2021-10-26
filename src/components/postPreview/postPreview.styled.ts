import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-medium);
`;

export const Title = styled.h4`
  font-size: 3.125rem;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
  font-weight: 500;
  margin: 0 0 var(--spacing-small) 0;
`;

export const Excerpt = styled.p`
  font-size: 2rem;
  color: #777c9b;
  font-weight: 400;
  line-height: 26px;
  margin: 0 0 var(--spacing-medium) 0;
`;

export const ReadMore = styled.div`
  a {
    display: flex;
    align-items: center;
  }
  span {
    font-size: 2rem;
    font-weight: 400;
    color: #233044;
    margin-right: var(--spacing-small);
  }
`;
