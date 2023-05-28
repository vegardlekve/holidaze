import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    --primary: #d46398;
    --secondary: #00d875;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Montserrat';
}

main {
    min-height: 100vh;
    background: #f1f1f1;
}

h2 {
    font-size: 1.2rem;
}

h3 {
    font-family: 'Montserrat';
    font-size: 1rem;
    color: var(--secondary);
}

a {
    color: inherit;
    text-decoration: none;
}

button{
    all: unset;
    font-size: 1.1rem;
    cursor: pointer;
    background-color: var(--primary);
}
`;

export default GlobalStyle;
