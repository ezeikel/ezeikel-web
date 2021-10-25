import { useField } from "formik";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    font-size: 1.6rem;
    padding: var(--spacing-medium);
    border-radius: var(--border-radius);
    border: 1px solid #efefef;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
  }
`;

const Label = styled.label`
  display: flex;
  margin-bottom: var(--spacing-small);
  font-size: 1.6rem;
`;

const TextInput = ({ label, className, ...props }) => {
  const [field] = useField(props);

  return (
    <Wrapper className={`input ${className}`}>
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <TextareaAutosize {...field} {...props} minRows={4} />
    </Wrapper>
  );
};

export default TextInput;
