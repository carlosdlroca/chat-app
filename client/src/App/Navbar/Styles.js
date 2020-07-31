import styled from "styled-components";
import { Link } from "react-router-dom";

export const Navbar = styled.nav`
    display: flex;
    justify-content: center;
    padding: 4rem 1rem 1rem;
    @media only screen and (min-width: 1080px) {
        justify-content: flex-end;
        padding: 4rem 6rem;
    }
`;

export const NavLinks = styled.div`
    display: flex;

    & > *:not(:last-child) {
        margin-right: 2rem;
    }
`;

export const NavLink = styled(Link)`
    font-size: clamp(1.6rem, 5.1vw, 2.4rem);
    color: ${({ profile }) => (profile ? "blue" : "white")};
    &:hover,
    &:focus {
        cursor: pointer;
        text-decoration: underline;
    }
`;
