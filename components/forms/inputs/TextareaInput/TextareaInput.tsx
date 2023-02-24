'use client';

import { ReactElement, InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';

type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  minRows?: number;
  className?: string;
};

const TextInput = ({
  label,
  name,
  minRows,
  className,
  style,
  height,
  ...props
}: TextareaProps): ReactElement => {
  const [field] = useField({ ...props, name });

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="flex mb-2 text-base">
          {label}
        </label>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <TextareaAutosize
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        minRows={4}
        className="text-base border border-gray-200 rounded p-4 appearance-none w-full outline-0 resize-none"
      />
    </div>
  );
};

export default TextInput;
