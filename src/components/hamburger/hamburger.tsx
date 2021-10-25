import { useState } from "react";
import { Wrapper } from "./hamburger.styled";

const Hamburger = () => {
  const [active, setActive] = useState(false);

  return (
    <Wrapper onClick={() => setActive(!active)} active={active}>
      <span />
      <span />
      <span />
    </Wrapper>
  );
};

export default Hamburger;
