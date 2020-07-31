import styled from "styled-components";

const Message = styled.div`
    border-radius: 1.5rem;
    padding: 1rem;
    background-color: rebeccapurple;
    color: white;
`;

Message.Text = styled.p`
    font-size: 1.5rem;
`;
Message.Author = styled.span`
    font-size: 1rem;
    color: grey;
`;
Message.Options = styled.div``;

export default Message;
