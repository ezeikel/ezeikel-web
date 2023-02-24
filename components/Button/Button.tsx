import { ReactNode } from 'react';
import classNames from 'classnames';

export type ButtonProps = {
  variant?: 'default' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button = ({
  variant,
  type = 'button',
  children,
  className,
  disabled = false,
}: ButtonProps) => {
  const buttonClasses = classNames(
    'border border-navy-blue cursor-pointer bg-navy-blue rounded text-white py-4 p-8 text-xl font-medium',
    {
      'bg-transparent text-navy-blue': variant === 'outline',
      [className as string]: !!className,
    },
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
