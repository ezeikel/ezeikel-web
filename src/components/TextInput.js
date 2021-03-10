import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  display: flex;
  svg {
    margin-right: var(--spacing-small);
  }
`;

const Label = styled.label`
  display: flex;
`;

const TextInput = ({ label, leftIcon, rightIcon, className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Wrapper className={className}>
      {leftIcon && (
        <FontAwesomeIcon
          icon={["far", leftIcon]}
          color="var(--color-black)"
          size="2x"
          onClick={() => null}
      />
      )}
      <input {...field} {...props} />
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
    </Wrapper>
  );
};

export default TextInput;
