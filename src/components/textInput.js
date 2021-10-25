import { useField } from "formik";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex: 1;
    input {
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
    svg {
      margin-right: var(--spacing-small);
    }
  }
`;

const Label = styled.label`
  display: flex;
  margin-bottom: var(--spacing-small);
  font-size: 1.6rem;
`;

const TextInput = ({ label, leftIcon, rightIcon, className, ...props }) => {
  const [field] = useField(props);

  return (
    <Wrapper className={`input ${className}`}>
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <div>
        {leftIcon && (
          <FontAwesomeIcon
            icon={["far", leftIcon]}
            color="var(--color-black)"
            size="2x"
            onClick={() => null}
          />
        )}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...field} {...props} />
      </div>
    </Wrapper>
  );
};

export default TextInput;
