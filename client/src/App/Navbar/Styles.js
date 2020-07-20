import styled from "styled-components";

export const StyledNavbar = styled.nav`
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

export const NavItem = styled.span`
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    color: white;
`;

export const NavLink = styled(NavItem)`
    &:hover,
    &:focus {
        cursor: pointer;
        text-decoration: underline;
    }
`;
