import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *, *::after, *::before {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }

    html {
        box-sizing: border-box;
        font-size: 62.5%;
        font-family: sans-serif;
    }

    body {
        background-color: papayawhip;
        color: palevioletred;
    }
`;
