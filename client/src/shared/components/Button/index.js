import styled from "styled-components";

const Button = styled.button`
    border: none;
    border-radius: 1rem;
    box-shadow: 0 1rem 0.2rem rgba(0, 0, 0, 0.2),
        0 1rem 0.2rem rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2rem;
    padding: 1rem 2rem;

    &:hover,
    &:focus {
        transform: translateY(-0.4rem);
        box-shadow: 0 1.4rem 0.2rem rgba(0, 0, 0, 0.3),
            0 1rem 0.6rem rgba(0, 0, 0, 0.7);
    }

    &:active {
        transform: translateY(-0.2rem);
        box-shadow: 0 1.2rem 0.2rem rgba(0, 0, 0, 0.3),
            0 1rem 0.4rem rgba(0, 0, 0, 0.4);
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
