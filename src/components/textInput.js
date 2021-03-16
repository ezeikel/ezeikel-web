import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    input {
      font-size: 2rem;
      padding: var(--spacing-medium);
      border-radius: var(--border-radius);
      border: 1px solid #EFEFEF;
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
`;

const TextInput = ({ label, leftIcon, rightIcon, className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Wrapper className={className}>
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
        <input {...field} {...props} />
      </div>
  
    </Wrapper>
  );
};

export default TextInput;
