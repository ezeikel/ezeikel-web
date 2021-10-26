import { ReactElement, InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import { Wrapper, Label } from "./textareaInput.styled";

type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  initialFocus?: boolean;
  minRows?: number;
  className?: string;
};

const TextInput = ({
  label,
  name,
  initialFocus = false,
  minRows,
  className,
  ...props
}: TextareaProps): ReactElement => {
  const [field] = useField({ ...props, name });
  const textareaEl = useRef(null);

  useEffect(() => {
    if (initialFocus) {
      textareaEl.current.focus();
    }
  }, []);

  return (
    <Wrapper className={`input-wrapper input-wrapper--textarea ${className}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <TextareaAutosize {...field} {...props} minRows={4} ref={textareaEl} />
    </Wrapper>
  );
};

export default TextInput;
