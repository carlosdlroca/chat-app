import styled from "styled-components";

const Button = styled.button`
    border: none;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 0.2rem rgba(0, 0, 0, 0.2);
    color: white;
    font-size: 2rem;
    padding: 1rem 2rem;
    transition: all 0.2s ease;
    &:hover,
    &:focus {
        cursor: pointer;
        transform: translateY(-0.4rem);
        box-shadow: 0 0.8rem 0.2rem rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(-0.2rem);
        box-shadow: 0 0.3rem 0.2rem rgba(0, 0, 0, 0.3);
    }
`;

export const PrimaryButton = styled(Button)`
    background-color: green;
`;

export const SecondaryButton = styled(Button)`
    background-color: steelblue;
`;

export const WarningButton = styled(Button)`
    background-color: orangered;
`;

export const DangerButton = styled(Button)`
    background-color: red;
`;
