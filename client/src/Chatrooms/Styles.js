import styled from "styled-components";

export const ChatroomsList = styled.ul`
    display: grid;
    grid-template-columns: 1fr;

    & > *:not(:last-child) {
        margin-bottom: 1.5rem;
    }
    padding: 1rem 2rem;
`;

export const ChatroomItem = styled.li`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 1rem 2rem;
    background: white;

    box-shadow: 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
`;

ChatroomItem.Info = styled.section`
    font-size: 1.5rem;
    color: #1a2a3a;
`;

ChatroomItem.Name = styled.span`
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-primary);
`;

ChatroomItem.Options = styled.section`
    display: flex;
    align-items: center;
    font-size: 1.6rem;

    & > *:not(:last-child) {
        margin-right: 1rem;
    }
`;
