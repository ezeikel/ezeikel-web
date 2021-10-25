import { Default, Outline } from "./button.styled";

const Button = ({ title, variant, className }) =>
  variant === "outline" ? (
    <Outline className={className}>{title}</Outline>
  ) : (
    <Default className={className}>{title}</Default>
  );

export default Button;
