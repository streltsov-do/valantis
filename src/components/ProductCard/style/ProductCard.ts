import styled from "styled-components/macro";

export const Div = styled.div<{ $width?: string }>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: ${(props) => props.$width || "max-content"};
    border: 2px solid aqua;
    border-radius: 10px;
    padding: 25px 5px 25px 100px;
    position: relative;
    box-shadow: 4px 3px 5px lightblue;
`;

export const Num = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100px;
    border-radius: 10px 0 0 10px;
    background-color: azure;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;

export const Col = styled.div``;

export const Id = styled.div`
    font-size: 14px;
`;
