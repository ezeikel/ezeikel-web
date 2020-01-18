import { createGlobalStyle, keyframes } from 'styled-components';
import styledNormalize from 'styled-normalize';

export default createGlobalStyle`
  ${styledNormalize}

  /* CSS Variables */
  :root {
    /* Colors */
    --color-primary: #2DE1C2;
    /* --color-primary: #F7E7CE; */
    --color-secondary: #F1D3D1;
    --color-tertiary: #4629D3;
    --color-radical-red: #FF3D63;
    --color-aquamarine: #62FFD3;
    --color-bittersweet: #FF7264;
    --color-black: #2E3333;
    --color-white: #FFFFFF;
    --color-gold: #CDA349;
    --color-gold-lighter: #D4AF61;
    --color-light-grey: #ECF0F1;
    --color-red: #E74C3C;
    --color-green: #2ECC71;
    --color-grey: #BDC3C7;
    --color-dark-grey: #9B9B9B;
    --color-black: #484848;
    --color-gold: #CDA349;
    /* Spacing */
    --spacing-tiny: 4px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 32px;
    --spacing-huge: 64px;
    /* Font */
    --primary-font-family: 'haboro-soft', sans-serif;
    --default-font-size: 10px;
    --font-size-tiny: 1.4rem;
    --font-size-small: 1.6rem;
    --font-size-medium: 1.8rem;
    --font-size-large: 2rem;
    --font-size-huge: 2.2rem;

    --box-shadow: 0 3px 6px rgba(0,0,0, 0.16);

    --border-radius: 4px;

    /* components */
    --header-height: 120px;
  }
  * {
    box-sizing: border-box;
  }
  html {
    font-size: var(--default-font-size);
    scroll-behavior: smooth;
  }
  body {
    padding: 0;
    font-family: var(--primary-font-family);
    color: var(--color-black);
  }
  img {
    max-width: 100%;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }
  ::-moz-selection {
    background: var(--color-primary);
    color: var(--color-white);
  }
  ::selection {
    background: var(--color-primary);
    color: var(--color-white);
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: var(--color-light-grey);
    /*font-weight: 300;*/
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: var(--color-light-grey);
    font-weight: 300;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: var(--color-light-grey);
    font-weight: 300;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: var(--color-light-grey);
    font-weight: 300;
  }
  /* Hide fonts until webfonts have loaded to avoid FOUT */
  .wf-loading {
    visibility: hidden;
  }
  .map {
    width: 100%;
    height: 300px;
  }
  input, textarea {
    font-size: var(--default);
    color: var(--color-black);
  }
  input[type="text"], input[type="email"], input[type="tel"], input[type="date"], input[type="submit"], input[type="textarea"], textarea, select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    border-radius: 0;
    padding: 16px;
    border: 1px solid #ECF0F1;
    width: 100%;
    font-weight: 300;
  }

  textarea, input[type="textarea"] {
    height: 160px;
  }

  button {
    border: none;
    cursor: pointer;
  }
  /* button[type="submit"] {
    display: block;
    height: 100%;
    width: 100%;
    padding: 15px 90px;
    background-color: var(--color-primary);
    color: var(--color-white);
    transition: background-color 0.3s ease-in-out;
    text-transform: uppercase;
  } */
  button[type="submit"][disabled] {
    opacity: 0.7;
    text-decoration: line-through;
  }
  `;

export const spinKeyframe = keyframes`
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0);
  }
`;

export const rotateKeyFrame = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const scrollDown = keyframes`
  40%, 60% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
`;