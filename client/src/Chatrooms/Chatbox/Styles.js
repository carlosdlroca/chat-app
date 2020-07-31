import styled from "styled-components";

export const ChatboxContainer = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 6rem;
    background: white;
`;

export const ChatboxMessages = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column-reverse;
`;

export const ChatboxForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ChatboxInput = styled.input`
    border-radius: 0.5rem;
    padding: 1rem 1.5rem;
    font-size: 2rem;

    &::placeholder {
        font-size: 1.6rem;
    }
`;
