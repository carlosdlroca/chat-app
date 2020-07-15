import styled from "styled-components";

export const StyledNavbar = styled.nav`
    display: flex;
    justify-content: flex-end;
    padding: 4rem 7rem;
`;

export const NavLinks = styled.div`
    display: flex;

    & > *:not(:last-child) {
        margin-right: 2rem;
    }
`;

export const NavItem = styled.span`
    font-size: 2.4rem;
    color: white;
`;

export const NavLink = styled(NavItem)`
    &:hover,
    &:focus {
        cursor: pointer;
        text-decoration: underline;
    }
`;
