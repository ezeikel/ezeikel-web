type ButtonProps = {
  title: string;
  variant?: "default" | "outline";
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button = ({
  title,
  variant,
  type = "button",
  className,
}: ButtonProps) => {
  const baseButtonClasses =
    "border border-navy-blue cursor-pointer bg-navy-blue rounded text-white py-4 p-8 text-xl font-medium";

  if (variant === "outline") {
    return (
      <button
        type={type}
        className={`${baseButtonClasses} bg-transparent text-navy-blue ${className}`}
      >
        {title}
      </button>
    );
  }

  return (
    <button type={type} className={`${baseButtonClasses} ${className}`}>
      {title}
    </button>
  );
};

export default Button;
