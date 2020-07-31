import styled from "styled-components";

// N column Grid Component
// defaults to 12 columns
export default styled.div`
    display: grid;
    grid-template-columns: repeat(
        ${(props) => (props.cols ? props.cols : "12")},
        1fr
    );
`;

// Grid item defaulting to spanning 3 columns
export const GridItem = styled.div`
    grid-column: 1 / span ${(props) => (props.span ? props.span : "3")};
`;
