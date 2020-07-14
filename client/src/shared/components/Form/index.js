import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FormTitle = styled.h1`
    font-size: 2.7rem;
    margin-bottom: 1rem;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:not(:last-child) {
        margin-bottom: 1.5rem;
    }
`;

export const InputLabel = styled.label`
    font-size: 2.2rem;
    text-decoration: underline;
    text-decoration-color: rebeccapurple;
    margin-bottom: 1rem;
`;

export const Input = styled.input`
    font-size: 2rem;
    padding: 0.5rem;
    &::placeholder {
        font-size: 1.8rem;
    }
`;
