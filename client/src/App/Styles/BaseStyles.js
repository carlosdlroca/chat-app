import { createGlobalStyle } from "styled-components";
import { DEFAULT_COLORS } from "./themes";

export default createGlobalStyle`

    :root {
        --color-primary: ${DEFAULT_COLORS.primary};
        --color-secondary: ${DEFAULT_COLORS.secondary};
        --color-tertiary: ${DEFAULT_COLORS.tertiary};
        --color-info: ${DEFAULT_COLORS.info};
        --color-warning: ${DEFAULT_COLORS.warning};
    }

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
        background-color: #ffae8f;
        color: #ff677d;
    }

    a {
        text-decoration: none;
    }
`;
