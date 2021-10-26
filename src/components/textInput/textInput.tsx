import { ReactElement, InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Wrapper, Label } from "./textInput.styled";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  initialFocus?: boolean;
  leftIcon?: IconName;
};

const TextInput = ({
  label,
  name,
  initialFocus = false,
  leftIcon,
  className,
  ...props
}: TextInputProps): ReactElement => {
  const [field] = useField({ ...props, name });
  const inputEl = useRef(null);

  useEffect(() => {
    if (initialFocus) {
      inputEl.current.focus();
    }
  }, []);

  return (
    <Wrapper className={`input-wrapper input-wrapper--text ${className}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
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
        <input {...field} {...props} ref={inputEl} />
      </div>
    </Wrapper>
  );
};

export default TextInput;
