import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;
export const Error = styled.span`
  display: flex;
  margin-top: 25px;
  margin-bottom: 2px;
  color: red;
  opacity: 0.7;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid;
    border-color: ${props => (props.error ? 'red' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #175cb0;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  & [disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    padding: 15px 0;
    display: flex;
    align-items: center & + li {
      border-top: 1px solid #eee;
    }
    span {
      flex: 1;
      text-transform: capitalize;
    }
    a {
      color: #112d4e;
      text-decoration: none;
      margin-left: 20px;
    }
  }
`;

export const RemoveButton = styled.button`
  margin-left: 15px;
  background: none;
  border: none;
  color: #112d4e;
  margin-left: 20px;
`;
