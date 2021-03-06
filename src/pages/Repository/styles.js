import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #175cb0;
    font-size: 16px;
    text-decoration: none;
  }
  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  li {
    margin-bottom: 8px;
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }
  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;
      a {
        text-decoration: none;
        color: #333;
        &:hover {
          color: #175cb0;
        }
      }
    }
    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const IssueBadge = styled.span`
  background-color: #${props => props.badgeColor || '333'};
  color: #333;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 3px 4px;
  margin-left: 10px;
  box-shadow: 1px 1.5px rgba(27, 31, 35, 0.15);
`;

export const IssueFilter = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  select {
    border-radius: 4px;
    background-color: #2853b1;
    padding: 5px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    text-align-last: center;
  }
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  button {
    padding: 10px;
    border: 0;
    outline: 0;
    border-radius: 5px;
    font-weight: 600;
    &: disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;
