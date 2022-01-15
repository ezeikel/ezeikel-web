import { ReactElement, InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

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
    <div className={`flex flex-col bg-white rounded ${className}`}>
      {label && (
        <label htmlFor={name} className="flex mb-2 text-base">
          {label}
        </label>
      )}
      <div className="flex border border-gray-200 rounded p-4">
        {leftIcon && (
          <FontAwesomeIcon
            icon={["far", leftIcon]}
            size="lg"
            onClick={() => null}
            className="mr-2 cursor-pointer text-black"
          />
        )}
        <input
          className="text-base text-black border-0 p-0 appearance-none w-full outline-0"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          ref={inputEl}
        />
      </div>
    </div>
  );
};

export default TextInput;
