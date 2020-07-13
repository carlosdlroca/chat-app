import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const InputLabel = styled.label`
    font-size: 3rem;
    text-decoration: underline;
    text-decoration-color: rebeccapurple;
`;

export const Input = styled.input`
    font-size: 2rem;
    &::placeholder {
        font-size: 1.8rem;
    }
`;
