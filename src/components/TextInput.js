import React from "react";
import { useField } from "formik";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Label = styled.label`
  display: flex;
`;

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Wrapper>
      <input {...field} {...props} />
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
    </Wrapper>
  );
};

export default TextInput;
