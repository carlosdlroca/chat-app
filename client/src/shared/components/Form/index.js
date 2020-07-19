import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const FormTitle = styled.h1`
    font-size: 2.7rem;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: capitalize;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 2rem;
    }
`;

export const InputLabel = styled.label`
    font-size: 2.2rem;
    text-decoration: underline;
    text-decoration-color: rebeccapurple;
    margin-bottom: 1rem;
`;

export const Input = styled.input`
    appearance: none;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    color: palevioletred;
    font-size: 2rem;
    padding: 1rem 0.5rem;
    outline: 0;
    text-align: center;
    width: 100%;
    transition: all 0.3s ease;

    &::placeholder {
        color: white;
        font-size: 1.8rem;
    }

    &:active,
    &:focus {
        background-color: white;
        width: 121%;
    }
`;
