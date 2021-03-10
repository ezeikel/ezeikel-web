import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default createGlobalStyle`
  /* fixes fontawesome icon sizes */
  ${dom.css()}

  ${styledNormalize}

  /* CSS Variables */
  :root {
    /* Colors */
    --color-primary: #233044;
    --color-black: #545454;
    --color-white: #ffffff;
    --color-light-grey: rgba(153, 153, 153, 0.75);
    --color-like: #ed4956;
    /* Spacing */
    --spacing-tiny: 4px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 32px;
    --spacing-huge: 64px;
    /* Font */
    --font-family-primary: 'freight-sans-pro', sans-serif;
    --font-family-secondary: 'brandon-grotesque', sans-serif;
    --font-family-tertiary: 'freight-text-pro', serif;
    --default-font-size: 10px;
    --font-size-tiny: 1.4rem;
    --font-size-small: 1.6rem;
    --font-size-medium: 1.8rem;
    --font-size-large: 2rem;
    --font-size-huge: 2.2rem;

    --box-shadow: 0 3px 6px rgba(0,0,0, 0.16);

    --border-radius: 4px;

    --line-height: 1.5;

    /* components */
    --header-height: 80px;
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
    font-family: var(--font-family-primary);
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
    padding: var(--spacing-medium);
    border: 1px solid #ECF0F1;
    width: 100%;
    font-weight: 300;
  }

  textarea, input[type="textarea"] {
    height: 160px;
  }
  `;
