import styled from "styled-components";

export const Div = styled.div`
    padding: 50px 30px;
    position: relative;
    /* flex-direction: column;
    gap: 20px; */
`;

export const CardsPage = styled.h3`
    margin-bottom: 20px;
`;

export const CardsContainer = styled.div`
    display: flex;
    gap: 20px;
`;

export const Cards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const BtnPage = styled.button<{ right?: boolean }>`
    position: sticky;
    height: 70vh;
    top: calc(50px + 25px + 20px);
    width: 30px;
    font-size: 40px;
    padding: 0;
    border-radius: ${(props) =>
        props.right ? "0 50px 50px 0" : "50px 0 0 50px"};
    /* border: 1px solid black; */
    border: none;
`;
